import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/champ-code-academy/', // Replace with your repo name
  plugins: [
    react(),
    tailwindcss(),
  ],
})
