const createPath = (...paths: string[]): string => paths.map((path) => path.replace(/\/$/, '')).join('/')
export default createPath