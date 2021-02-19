export function isUrlExpired(expirationDate) {
  return new Date(expirationDate) < new Date();
}
