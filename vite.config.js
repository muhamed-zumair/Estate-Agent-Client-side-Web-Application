import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/Estate-Agent-Client-side-Web-Application/',
  plugins: [react()],
})

