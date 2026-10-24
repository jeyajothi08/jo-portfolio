import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Any motion at all. */
export const MOTION = '(prefers-reduced-motion: no-preference)'

/** The pinned zoom and expand scenes: large screens with room for them. Keep in sync with the `scene` variant in index.css. */
export const SCENES = '(prefers-reduced-motion: no-preference) and (min-width: 80rem) and (min-height: 40rem)'

/** Sets every [data-draw] path inside `root` up to be drawn by animating strokeDashoffset from 1 to 0. */
export const drawable = (root) => {
  const paths = root ? [...root.querySelectorAll('[data-draw]')] : []
  gsap.set(paths, { strokeDasharray: 1, strokeDashoffset: 1 })
  return paths
}

export { gsap, ScrollTrigger, useGSAP }
