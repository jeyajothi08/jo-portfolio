/** True for an empty value or one still written as a [PLACEHOLDER]. */
export const isPlaceholder = (value) => !value || /^\s*\[[^\]]*\]\s*$/.test(String(value))

/** Props for a link that leaves the site. */
export const external = { target: '_blank', rel: 'noopener noreferrer' }

/** Downloads a file locally instead of opening it in the browser viewer. */
export async function downloadFile(url, filename) {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = blobUrl
    if (filename) link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobUrl)
  } catch {
    const link = document.createElement('a')
    link.href = url
    if (filename) link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
