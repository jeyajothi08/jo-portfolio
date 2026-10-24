import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

const REDUCE = '(prefers-reduced-motion: reduce)'

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(() => typeof window !== 'undefined' && window.matchMedia(REDUCE).matches)

  useEffect(() => {
    const query = window.matchMedia(REDUCE)
    const onChange = (event) => setReduce(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return reduce
}

/**
 * Smooth, weighted scrolling (Lenis) driven by GSAP's ticker so ScrollTrigger scenes stay in step.
 * Native scrolling is kept, so sticky sections, keyboard scrolling and #anchors all still work.
 * Anchor links glide to their section and stop below the navbar (html's scroll-padding-top in index.css).
 * Skipped entirely when the visitor asks for reduced motion.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia(REDUCE).matches) return

    const lenis = new Lenis({ lerp: 0.09, anchors: true, autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])
}

/** The id of the section currently crossing the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')
  const key = ids.join(',')

  useEffect(() => {
    const sections = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -54% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [key])

  return active
}

/** Types and erases each word in turn. Shows the first word, still, when motion is reduced. */
export function useTypewriter(words, { typeMs = 70, eraseMs = 35, holdMs = 1800, gapMs = 350 } = {}) {
  const reduce = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(words[0])
  const [erasing, setErasing] = useState(false)

  useEffect(() => {
    if (reduce) return
    const word = words[index % words.length]
    let delay = erasing ? eraseMs : typeMs
    if (!erasing && text === word) delay = holdMs
    if (erasing && text === '') delay = gapMs

    const timer = setTimeout(() => {
      if (!erasing && text === word) setErasing(true)
      else if (erasing && text === '') {
        setErasing(false)
        setIndex((n) => n + 1)
      } else setText(word.slice(0, text.length + (erasing ? -1 : 1)))
    }, delay)
    return () => clearTimeout(timer)
  }, [reduce, words, index, text, erasing, typeMs, eraseMs, holdMs, gapMs])

  return reduce ? words[0] : text
}
