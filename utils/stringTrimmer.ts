export default function trimString(string: string, length: number): string {
  if (string.length > length) {
    return string.substring(0, length) + '...'
  }
  return string
}
