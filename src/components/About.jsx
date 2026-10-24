import { useRef, useState } from 'react'
import { about, profile } from '../data/portfolio'
import { MOTION, SCENES, drawable, gsap, useGSAP } from '../lib/gsap'
import { CircleScribble } from './ui/Doodles'
import { Item, Reveal } from './ui/Reveal'
import Rich from './ui/Rich'
import { StickyNote, Tape } from './ui/Sketch'

export default function About() {
  const stage = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(stage)
      gsap.matchMedia().add({ scene: SCENES, motion: MOTION }, ({ conditions }) => {
        if (!conditions.motion) return
        const circle = drawable(stage.current)

        if (conditions.scene) {
          // Scroll to zoom: the heading starts too big for the screen and settles to size as you scroll.
          // It fades in while the stage arrives, so its giant letters are never seen cut off by the stage edge.
          gsap
            .timeline({ scrollTrigger: { trigger: stage.current, start: 'top 35%', end: 'bottom bottom', scrub: 0.6 } })
            .fromTo(q('[data-zoom="text"]'), { scale: 6 }, { scale: 1, duration: 1, ease: 'power2.out', force3D: false })
            .fromTo(q('[data-zoom="text"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'none' }, 0.12)
            .fromTo(q('[data-zoom="note"]'), { y: 50, rotate: -14, opacity: 0 }, { y: 0, rotate: 0, opacity: 1, duration: 0.25 }, 0.72)
            .to(circle, { strokeDashoffset: 0, duration: 0.3 }, 0.85)
            .to({}, { duration: 0.3 })
        } else {
          gsap
            .timeline({ scrollTrigger: { trigger: stage.current, start: 'top 70%', once: true } })
            .from(q('[data-zoom]'), { y: 30, opacity: 0, stagger: 0.1, duration: 0.6, ease: 'back.out(1.4)' })
            .to(circle, { strokeDashoffset: 0, duration: 0.6 }, 0.4)
        }
      })
    },
    { scope: stage },
  )

  return (
    <section id="about" aria-labelledby="about-title">
      <div ref={stage} className="relative scene:h-[210vh]">
        <div className="flex items-center justify-center overflow-hidden px-5 pb-12 pt-20 scene:sticky scene:top-0 scene:h-svh scene:p-0">
          <div className="text-center">
            <div data-zoom="note">
              <StickyNote className="-rotate-3">{about.label}</StickyNote>
            </div>
            <h2 id="about-title" data-zoom="text" className="mt-6 text-[clamp(2.75rem,12vw,9.5rem)] leading-none">
              <Circled text={about.heading} word={about.headingCircle} />
            </h2>
          </div>
        </div>
      </div>

      <div className="shell grid items-center gap-16 pb-16 pt-6 md:grid-cols-[1.3fr_1fr] md:gap-12 lg:gap-20">
        <Reveal className="max-w-152 space-y-6 text-xl leading-relaxed md:text-2xl">
          {about.paragraphs.map((paragraph) => (
            <Item as="p" key={paragraph.slice(0, 24)}>
              <Rich text={paragraph} />
            </Item>
          ))}
        </Reveal>

        <Reveal>
          <Item>
            <Polaroid />
          </Item>
        </Reveal>
      </div>

      <div className="shell pb-20 md:pb-28">
        <Reveal as="dl" gap={0.07} className="grid grid-cols-2 gap-5 md:gap-7 lg:grid-cols-4">
          {about.facts.map((fact, i) => (
            <Item
              key={fact.label}
              className={`rounded-wobbly-md border-2 border-ink p-5 shadow-sketch md:p-6 ${
                i % 2 ? 'rotate-1 bg-postit' : '-rotate-1 bg-card'
              }`}
            >
              <dt className="text-lg text-ink-soft">{fact.label}</dt>
              <dd className="mt-1 font-display text-xl font-bold leading-snug md:text-2xl">
                <Rich text={fact.value} />
              </dd>
            </Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

/** Wraps one word of the heading in a red marker circle. */
function Circled({ text, word }) {
  const at = word ? text.indexOf(word) : -1
  if (at < 0) return text
  return (
    <>
      {text.slice(0, at)}
      <span className="relative inline-block">
        {word}
        <CircleScribble className="pointer-events-none absolute inset-x-[-22%] inset-y-[-22%] h-[144%] w-[144%] text-marker" />
      </span>
      {text.slice(at + word.length)}
    </>
  )
}

function Polaroid() {
  const [failed, setFailed] = useState(false)
  const showPhoto = __HAS_PROFILE_PHOTO__ && !failed

  return (
    <figure className="relative mx-auto w-[calc(100%-1rem)] max-w-84 rotate-3 rounded-wobbly-md border-2 border-ink bg-card p-4 shadow-sketch-lg transition-[rotate] duration-100 hover:rotate-1">
      <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-2" />
      <div className="hatch relative aspect-4/5 overflow-hidden rounded-wobbly-md border-2 border-ink">
        {showPhoto ? (
          <img
            src={profile.photo}
            alt={about.photoAlt}
            width="800"
            height="1000"
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div role="img" aria-label={about.photoAlt} className="grid h-full w-full place-items-center">
            <span aria-hidden="true" className="-rotate-6 font-display text-[clamp(6rem,28vw,9rem)] font-bold leading-none text-marker-ink">
              {profile.initials}
            </span>
          </div>
        )}
      </div>
      <figcaption className="pt-3 text-center font-display text-2xl">{about.photoCaption}</figcaption>
    </figure>
  )
}
