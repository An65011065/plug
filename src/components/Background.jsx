import React from "react";

/**
 * GPT5Gradient
 * A production‑ready recreation of the animated gradient used around the GPT‑5 launch.
 *
 * Technique (to match OpenAI's look):
 * 1) Soft multi‑radial background "wallpaper" (pastel spectrum) with heavy blur + slow pan/zoom.
 * 2) A subtle rotating conic "sheen" band to add motion depth.
 * 3) A bottom overlay that fades to white (or black in dark mode), like the launch pages.
 *
 * Usage:
 * <div className="h-[480px]">
 *   <GPT5Gradient dark={false} />
 * </div>
 *
 * Props:
 * - dark?: boolean — switches the bottom overlay to dark.
 * - speed?: number — base animation speed in seconds (default 28).
 * - className?: string — extra classes; parent should define height/rounded/etc.
 */
export default function Background({ dark = false, speed = 28, className = "" }) {
  return (
    <div
      className={`gpt5-gradient fixed inset-0 -z-10 isolate overflow-hidden ${className}`}
      data-theme={dark ? "dark" : "light"}
      aria-hidden="true"
      style={{
        // Let parent control sizing. Provide a sensible min-height for zero‑height containers.
        minHeight: 320,
      }}
    >
      {/* Background pastel "wallpaper" (multi‑radial gradients) */}
      <div
        className="gpt5-bg absolute -inset-[10%] will-change-transform"
        style={{
          // Allow consumer to influence speed via CSS var if desired
          '--gpt5-speed': `${speed}s`,
        }}
      />

      {/* Rotating sheen band (very subtle) */}
      <div className="gpt5-sheen pointer-events-none absolute inset-[-20%] will-change-transform" />

      {/* Grain for a bit of texture (extremely subtle) */}
      <div className="gpt5-grain pointer-events-none absolute inset-0" />

      {/* Bottom overlay to white/black, like OpenAI hero/Chat UI */}
      <div className="gpt5-overlay pointer-events-none absolute inset-0" />

      {/* Optional: slot children on top */}
      <div className="relative z-10 w-full h-full" />

      {/* Styles */}
      <style>{`
        .gpt5-gradient { background: transparent; }

        /* === 1) Sophisticated cannabis-themed wallpaper === */
        .gpt5-bg {
          background-image:
            radial-gradient(1200px 900px at 20% 30%, rgba(46, 125, 50, 0.75), rgba(46, 125, 50, 0) 60%),
            radial-gradient(1200px 900px at 82% 22%, rgba(102, 187, 106, 0.68), rgba(102, 187, 106, 0) 58%),
            radial-gradient(1100px 800px at 72% 72%, rgba(198, 131, 70, 0.65), rgba(198, 131, 70, 0) 60%),
            radial-gradient(1000px 800px at 30% 78%, rgba(156, 204, 101, 0.62), rgba(156, 204, 101, 0) 58%),
            radial-gradient(1000px 1000px at -10% 50%, rgba(69, 90, 120, 0.55), rgba(69, 90, 120, 0) 55%);
          filter: blur(60px) saturate(1.15) hue-rotate(0deg);
          transform: translate3d(-2%, -2%, 0) scale(1.04) rotate(-0.25deg);
          animation: gpt5-pan var(--gpt5-speed, 28s) ease-in-out infinite alternate,
                     gpt5-hue calc(var(--gpt5-speed, 28s) * 4) linear infinite;
        }

        @keyframes gpt5-pan {
          0% { transform: translate3d(-2%, -2%, 0) scale(1.04) rotate(-0.25deg); }
          100% { transform: translate3d(2%, 2%, 0) scale(1.10) rotate(0.25deg); }
        }

        @keyframes gpt5-hue {
          0% { filter: blur(60px) saturate(1.05) hue-rotate(0deg); }
          100% { filter: blur(60px) saturate(1.05) hue-rotate(360deg); }
        }

        /* === 2) Rotating conic sheen band === */
        .gpt5-sheen {
          background: conic-gradient(from 0deg at 50% 50%,
            rgba(255,255,255,0) 0deg,
            rgba(255,255,255,0.10) 42deg,
            rgba(255,255,255,0) 55deg,
            rgba(255,255,255,0) 360deg);
          mix-blend-mode: soft-light; /* keeps it subtle over colors */
          opacity: .55;
          transform: rotate(0deg) scale(1.05);
          animation: gpt5-spin calc(var(--gpt5-speed, 28s) * 1.2) linear infinite;
          filter: blur(12px);
        }
        @keyframes gpt5-spin { to { transform: rotate(360deg) scale(1.05); } }

        /* === 3) Whisper‑fine film grain === */
        .gpt5-grain {
          background-image: url('data:image/svg+xml;utf8,\
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120">\
              <filter id="n">\
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>\
                <feColorMatrix type="saturate" values="0"/>\
                <feComponentTransfer>\
                  <feFuncA type="table" tableValues="0 0.06"/>\
                </feComponentTransfer>\
              </filter>\
              <rect width="120" height="120" filter="url(%23n)"/>\
            </svg>');
          background-size: 120px 120px;
          mix-blend-mode: overlay;
          opacity: .04;
          animation: gpt5-grain-move 1.5s steps(10) infinite;
        }
        @keyframes gpt5-grain-move { to { transform: translate3d(1%, 0.5%, 0); } }

        /* === 4) Bottom overlay to warm cream background === */
        .gpt5-overlay {
          background: linear-gradient(to bottom, rgba(255,251,240,0) 0%, rgba(255,251,240,1) 100%);
        }
        [data-theme="dark"] .gpt5-overlay {
          background: linear-gradient(to bottom, rgba(45,24,16,0) 0%, rgba(45,24,16,1) 100%);
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .gpt5-bg, .gpt5-sheen, .gpt5-grain { animation: none !important; }
        }
      `}</style>
    </div>
  );
}