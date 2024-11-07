import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for aliasing React Native to React Native Web
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-native': 'react-native-web', 
    },
  },
})