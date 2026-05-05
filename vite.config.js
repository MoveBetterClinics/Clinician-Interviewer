import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Build-time selector for paradigm overlays under brands/<dir>/.
// Vercel sets VITE_BRAND/BRAND per project (the people deployment relies on
// the codebase default — no env var set there). Pre-rename, the value was
// 'human' and got mapped to 'people'; the shim normalizes any legacy 'human'
// value that might still leak in. Safe to remove once no consumer sets it.
const brandEnv = (process.env.VITE_BRAND || process.env.BRAND || 'people').toLowerCase()
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
