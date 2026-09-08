import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NO CSP HEADERS ARE SET HERE!
export default defineConfig({
  plugins: [react()],
})