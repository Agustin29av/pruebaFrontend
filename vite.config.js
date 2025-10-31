import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'   // ← SWC, no Babel

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',   // alias al directorio src
    },
  },
})
