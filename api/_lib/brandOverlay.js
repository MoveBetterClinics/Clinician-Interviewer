// Serverless-side counterpart to the Vite @brand-overlay alias used by the
// browser bundle. Returns the brands/<dir>/ name for the active deployment so
// API handlers can dynamically import paradigm modules. Pre-rename, the people
// deployment used BRAND=human; the shim normalizes any legacy 'human' value
// that might still leak in. Safe to remove once no consumer sets it.

export function getBrandDir() {
  const env = (process.env.BRAND || process.env.VITE_BRAND || 'people').toLowerCase()
  return env === 'human' ? 'people' : env
}

export async function importBrandOverlay(modulePath) {
  return import(`../../brands/${getBrandDir()}/${modulePath}`)
}
