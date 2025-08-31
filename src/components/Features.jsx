import React from 'react'

const Features = () => {
  const features = [
    {
      title: 'React 18',
      description: 'Built with the latest React features including concurrent rendering and automatic batching.',
      icon: '⚛️'
    },
    {
      title: 'Tailwind CSS',
      description: 'Utility-first CSS framework for rapid UI development with consistent design.',
      icon: '🎨'
    },
    {
      title: 'Vite',
      description: 'Lightning-fast build tool with hot module replacement for the best developer experience.',
      icon: '⚡'
    },
    {
      title: 'Responsive Design',
      description: 'Mobile-first responsive design that works perfectly on all devices and screen sizes.',
      icon: '📱'
    },
    {
      title: 'Modern JavaScript',
      description: 'ES6+ features, JSX, and modern development practices for clean, maintainable code.',
      icon: '🚀'
    },
    {
      title: 'Component Architecture',
      description: 'Modular component-based architecture for scalable and reusable UI elements.',
      icon: '🧩'
    }
  ]

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Built with cutting-edge technologies to deliver exceptional performance and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
