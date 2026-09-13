import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages এ ডিপ্লয় করার সময় base পরিবর্তন করুন:
// base: '/your-repo-name/'
export default defineConfig({
  plugins: [react()],
  base: './',
})
