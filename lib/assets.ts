export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/Portfolio' : ''

export function getAssetPath(path: string): string {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  const clean = path.startsWith('/') ? path : `/${path}`
  if (BASE_PATH && clean.startsWith(BASE_PATH)) {
    return clean
  }
  return `${BASE_PATH}${clean}`
}
