import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { site, profile } from './src/data/portfolio.js'

const isPlaceholder = (value) => !value || /^\s*\[[^\]]*\]\s*$/.test(String(value))
const publicFile = (path) => fileURLToPath(new URL(`./public${path}`, import.meta.url))

// Writes the <head> tags (title, description, Open Graph, theme colour) from
// src/data/portfolio.js, so the SEO text lives in the same file as everything else.
function seoFromData() {
  return {
    name: 'seo-from-data',
    transformIndexHtml() {
      const base = isPlaceholder(site.url) ? '' : site.url.replace(/\/$/, '')
      const absolute = (path) => `${base}${path}`
      const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })

      return [
        { tag: 'title', children: site.title, injectTo: 'head-prepend' },
        meta({ name: 'description', content: site.description }),
        meta({ name: 'author', content: profile.name }),
        meta({ name: 'theme-color', content: site.themeColor }),
        meta({ property: 'og:type', content: 'website' }),
        meta({ property: 'og:title', content: site.title }),
        meta({ property: 'og:description', content: site.description }),
        meta({ property: 'og:image', content: absolute(site.ogImage) }),
        meta({ property: 'og:image:width', content: '1200' }),
        meta({ property: 'og:image:height', content: '630' }),
        meta({ property: 'og:image:alt', content: `${profile.name}, ${profile.role}` }),
        ...(base ? [meta({ property: 'og:url', content: `${base}/` })] : []),
        meta({ name: 'twitter:card', content: 'summary_large_image' }),
        meta({ name: 'twitter:title', content: site.title }),
        meta({ name: 'twitter:description', content: site.description }),
        meta({ name: 'twitter:image', content: absolute(site.ogImage) }),
        ...(base ? [{ tag: 'link', attrs: { rel: 'canonical', href: `${base}/` }, injectTo: 'head' }] : []),
      ]
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoFromData()],
  define: {
    // Lets the About section show the initials avatar without requesting a photo that isn't there.
    __HAS_PROFILE_PHOTO__: JSON.stringify(existsSync(publicFile(profile.photo))),
  },
})
