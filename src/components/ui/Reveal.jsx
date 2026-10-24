import { useRef } from 'react'
import { MOTION, gsap, useGSAP } from '../../lib/gsap'

/**
 * Drops its <Item> children onto the page, one after another, the first time it scrolls into view:
 * each rises, settles from a slight tilt and fades in. With reduced motion everything is simply there.
 *
 * Keep hover transitions on an element inside an <Item>, not on the <Item> itself, so CSS and GSAP
 * never animate the same transform.
 */
export function Reveal({ as: Tag = 'div', gap = 0.08, className, children, ...rest }) {
  const root = useRef(null)

  useGSAP(
    () => {
      const items = [...root.current.querySelectorAll('[data-reveal]')].filter(
        (el) => el.parentElement.closest('[data-reveal-root]') === root.current,
      )
      gsap.matchMedia().add(MOTION, () => {
        gsap.from(items.length ? items : root.current, {
          y: 36,
          rotate: (i) => (i % 2 ? 1.5 : -1.5),
          opacity: 0,
          duration: 0.75,
          ease: 'back.out(1.4)',
          stagger: gap,
          scrollTrigger: { trigger: root.current, start: 'top 86%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <Tag ref={root} data-reveal-root="" className={className} {...rest}>
      {children}
    </Tag>
  )
}

export function Item({ as: Tag = 'div', children, ...rest }) {
  return (
    <Tag data-reveal="" {...rest}>
      {children}
    </Tag>
  )
}
