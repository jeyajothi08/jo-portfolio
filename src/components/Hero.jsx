import { Fragment, useRef } from 'react'
import { ArrowDown, Download, Mail, MapPin } from 'lucide-react'
import { hero, profile, ui } from '../data/portfolio'
import { useTypewriter } from '../lib/hooks'
import { MOTION, SCENES, drawable, gsap, useGSAP } from '../lib/gsap'
import { downloadFile, external } from '../lib/utils'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'
import { Arrow, FlowArrow, Loop, Star, Underline } from './ui/Doodles'
import { RoughCircle, SketchButton, StickyNote, Tape } from './ui/Sketch'

const socials = [
  { label: ui.linkedin, href: profile.socials.linkedin, Icon: LinkedInIcon, external: true },
  { label: ui.github, href: profile.socials.github, Icon: GitHubIcon, external: true },
  { label: ui.email, href: `mailto:${profile.email}`, Icon: Mail },
]

export default function Hero() {
  const typed = useTypewriter(hero.typing)
  const root = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      // On load: the note is stuck on, the name is written, then underlined, and the notebook is dropped on the desk.
      mm.add(MOTION, () => {
        const strokes = drawable(root.current)
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(q('[data-hero="note"]'), { scale: 0.4, rotate: -16, opacity: 0, duration: 0.5, ease: 'back.out(2)' })
          .fromTo(
            q('[data-hero="name"]'),
            { clipPath: 'inset(-25% 100% -25% -5%)' },
            { clipPath: 'inset(-25% 0% -25% -5%)', duration: 0.7, ease: 'power2.inOut', clearProps: 'clipPath' },
            0.1,
          )
          .to(strokes, { strokeDashoffset: 0, duration: 0.55 }, 0.7)
          .from(q('[data-hero="rise"]'), { y: 24, opacity: 0, duration: 0.6, stagger: 0.07 }, 0.35)
          .from(q('[data-hero="notebook"]'), { y: 90, rotate: 9, opacity: 0, duration: 0.95, ease: 'back.out(1.3)' }, 0.25)
          .fromTo(
            q('[data-hero="arrow"]'),
            { clipPath: 'inset(0 100% 0 0)' },
            { clipPath: 'inset(0 0% 0 0)', duration: 0.5, clearProps: 'clipPath' },
            1,
          )
      })

      // Scroll to zoom: as the hero leaves, the notebook comes forward and the words fall back.
      mm.add(SCENES, () => {
        const leaving = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.5 }
        gsap.to(q('[data-hero="zoom"]'), { scale: 1.22, rotate: -4, yPercent: -6, ease: 'none', scrollTrigger: leaving })
        gsap.to(q('[data-hero="copy"]'), { yPercent: -16, opacity: 0.1, ease: 'none', scrollTrigger: leaving })
      })
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} aria-labelledby="hero-title" className="relative pb-16 pt-28 md:pt-36 lg:pb-8">
      <div className="shell grid items-center gap-16 lg:min-h-[calc(100svh-11rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div data-hero="copy">
          <div data-hero="note" className="inline-block">
            <StickyNote className="-rotate-3 text-2xl">{hero.greeting}</StickyNote>
          </div>

          {/* Kalam sets "Jeyajothi D" about 5.6em wide; these sizes keep it on one line in its column. */}
          <h1 id="hero-title" className="relative mt-6 text-[clamp(3.25rem,15vw,5.75rem)] leading-none lg:text-[clamp(4.5rem,6.6vw,6.1rem)]">
            <span className="relative inline-block">
              <span data-hero="name" className="inline-block whitespace-nowrap">
                {profile.name}
              </span>
              <Underline className="absolute -bottom-3 left-[2%] h-[0.22em] w-[96%] text-marker" />
            </span>
            <Star className="absolute -top-2 right-0 hidden size-10 animate-spin-slow text-pen md:block lg:-right-2" />
          </h1>

          <p
            data-hero="rise"
            className="mt-7 whitespace-nowrap font-display text-[clamp(1.75rem,7.4vw,2.75rem)] font-normal leading-tight text-pen"
          >
            <span className="sr-only">{hero.typing.join(', ')}</span>
            <span aria-hidden="true">
              {typed}
              <span className="caret" />
            </span>
          </p>

          <p data-hero="rise" className="mt-5 max-w-124 text-2xl leading-snug">
            {profile.tagline}
          </p>

          <p
            data-hero="rise"
            className="mt-6 inline-flex items-center gap-2 rounded-wobbly border-2 border-dashed border-ink bg-card px-4 py-1.5 text-lg"
          >
            <MapPin size={20} strokeWidth={2.5} aria-hidden="true" className="shrink-0 text-marker-ink" />
            {profile.location}
          </p>

          <div data-hero="rise" className="relative mt-12 flex flex-wrap items-center gap-4 md:mt-24">
            <span data-hero="arrow" aria-hidden="true" className="pointer-events-none absolute -top-19 left-24 hidden items-start md:flex">
              <Arrow className="h-14 w-20 -scale-x-100 rotate-[8deg] text-ink" dashed />
              <span className="-ml-1 -mt-3 -rotate-6 font-display text-2xl text-marker-ink">{hero.ctaNote}</span>
            </span>
            <SketchButton href={hero.primaryCta.href} className="-rotate-1">
              {hero.primaryCta.label}
              <ArrowDown size={22} strokeWidth={2.5} aria-hidden="true" />
            </SketchButton>
            <SketchButton
              href={profile.resume}
              download={profile.resumeDownloadName || true}
              onClick={(e) => {
                e.preventDefault()
                downloadFile(profile.resume, profile.resumeDownloadName)
              }}
              variant="secondary"
              className="rotate-1"
            >
              <Download size={22} strokeWidth={2.5} aria-hidden="true" />
              {hero.secondaryCta.label}
            </SketchButton>
          </div>

          <ul data-hero="rise" className="mt-10 flex items-center gap-4">
            {socials.map(({ label, href, Icon, external: isExternal }, i) => (
              <li key={label}>
                <RoughCircle
                  as="a"
                  href={href}
                  {...(isExternal ? external : {})}
                  aria-label={isExternal ? `${label} ${ui.newTab}` : `${label} ${profile.email}`}
                  title={label}
                  className={`size-12 shadow-sketch-sm transition-[rotate,translate,background-color] duration-100 hover:-translate-y-0.5 hover:bg-postit ${
                    i % 2 ? 'hover:rotate-6' : 'hover:-rotate-6'
                  }`}
                >
                  <Icon size={20} strokeWidth={2.5} aria-hidden="true" />
                </RoughCircle>
              </li>
            ))}
          </ul>
        </div>

        <div data-hero="notebook" className="relative">
          <div data-hero="zoom" className="relative">
            <Loop className="absolute -right-4 -top-14 hidden size-24 animate-bob text-marker lg:block" />
            <Notebook code={hero.code} />
          </div>
        </div>
      </div>

      <a
        href={hero.scrollTarget}
        className="mx-auto mt-10 hidden w-max flex-col items-center text-xl text-ink-soft transition-colors hover:text-ink lg:flex"
      >
        {hero.scrollLabel}
        <FlowArrow down className="mt-1 h-8 w-12 animate-bob" />
      </a>
    </section>
  )
}

/** The code card: a ruled notebook page with the object written on it in pen. Each key links to its section. */
function Notebook({ code }) {
  let line = 0
  const number = () => (
    <span aria-hidden="true" className="select-none pr-3 text-right text-base text-ink-soft">
      {++line}
    </span>
  )

  return (
    <figure className="relative mx-auto w-[calc(100%-0.5rem)] max-w-136 rotate-2 lg:mr-2">
      <Tape className="-top-4 left-1/2 -translate-x-1/2 -rotate-3" />
      <div className="ruled overflow-hidden rounded-wobbly-md border-[3px] border-ink py-8 text-lg leading-8 shadow-sketch-lg sm:text-xl">
        <figcaption className="code-line font-display text-2xl font-bold">
          <span aria-hidden="true" />
          <span className="pl-3">{code.filename}</span>
        </figcaption>
        <span aria-hidden="true" className="code-line" />

        <pre className="font-body">
          <code className="block font-body">
            {code.comment && (
              <span className="code-line">
                {number()}
                <span className="code-text text-ink-soft">{code.comment}</span>
              </span>
            )}
            <span className="code-line">
              {number()}
              <span className="code-text">
                <span className="text-marker-ink">const</span> {code.variable} = {'{'}
              </span>
            </span>

            {code.fields.map((field) => (
              <span key={field.key} className="code-line">
                {number()}
                <span className="code-text" style={{ '--indent': 1 }}>
                  <a
                    href={field.href}
                    className="text-pen underline decoration-pen/50 decoration-wavy decoration-1 underline-offset-4 transition-colors hover:decoration-marker"
                  >
                    {field.key}
                    <span className="sr-only">
                      {' '}
                      ({code.jumpTo} {field.section})
                    </span>
                  </a>
                  <span className="text-ink-soft">: </span>
                  <Value value={field.value} />
                  <span className="text-ink-soft">,</span>
                </span>
              </span>
            ))}

            <span className="code-line">
              {number()}
              <span className="code-text">
                {'};'}
                <span aria-hidden="true" className="caret ml-1 text-marker" />
              </span>
            </span>
          </code>
        </pre>
      </div>
    </figure>
  )
}

function Value({ value }) {
  if (!Array.isArray(value)) return <span>"{value}"</span>
  return (
    <>
      <span className="text-ink-soft">[</span>
      {value.map((item, i) => (
        <Fragment key={item}>
          <span>"{item}"</span>
          {i < value.length - 1 && <span className="text-ink-soft">, </span>}
        </Fragment>
      ))}
      <span className="text-ink-soft">]</span>
    </>
  )
}
