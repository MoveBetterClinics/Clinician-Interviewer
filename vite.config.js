import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Build-time selector for paradigm overlays under brands/<dir>/.
// Vercel sets VITE_BRAND/BRAND per project; the people deployment historically
// uses VITE_BRAND=human while its overlay directory is brands/people/, so map
// 'human' → 'people' here. Equine and animals are 1:1.
const brandEnv = (process.env.VITE_BRAND || process.env.BRAND || 'human').toLowerCase()
const brandDir = brandEnv === 'human' ? 'people' : brandEnv

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@brand-overlay': path.resolve(__dirname, `./brands/${brandDir}`),
    },
  },
})
