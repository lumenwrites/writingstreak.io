export function capitalize(string) {
  if(!string) return ""
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function truncate(string, maxLength) {
  if (string.length > maxLength) {
string = string.substring(0,maxLength) + ".."
  }
  return string
}
