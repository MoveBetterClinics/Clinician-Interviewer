// Serverless-side counterpart to the Vite @brand-overlay alias used by the
// browser bundle. Returns the brands/<dir>/ name for the active deployment so
// API handlers can dynamically import paradigm modules. The people deployment
// historically uses BRAND=human while its overlay directory is brands/people/,
// so map 'human' → 'people' to match the Vite alias.

export function getBrandDir() {
  const env = (process.env.BRAND || process.env.VITE_BRAND || 'human').toLowerCase()
  return env === 'human' ? 'people' : env
}

export async function importBrandOverlay(modulePath) {
  return import(`../../brands/${getBrandDir()}/${modulePath}`)
}
