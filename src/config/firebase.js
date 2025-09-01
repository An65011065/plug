import { initializeApp } from 'firebase/app'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
export const functions = getFunctions(app)

// Connect to emulator in development
if (import.meta.env.DEV) {
  try {
    connectFunctionsEmulator(functions, 'localhost', 5001)
  } catch (error) {
    console.log('Functions emulator already connected or not available')
  }
}

export default app