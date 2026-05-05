// Serverless-side counterpart to the Vite @brand-overlay alias used by the
// browser bundle. Returns the brands/<dir>/ name for the active deployment so
// API handlers can dynamically import paradigm modules.

export function getBrandDir() {
  return (process.env.BRAND || process.env.VITE_BRAND || 'people').toLowerCase()
}

export async function importBrandOverlay(modulePath) {
  return import(`../../brands/${getBrandDir()}/${modulePath}`)
}
