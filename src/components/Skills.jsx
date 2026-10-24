import { useRef } from 'react'
import { BrainCircuit, Database, LayoutTemplate, Server, Wrench } from 'lucide-react'
import { skills } from '../data/portfolio'
import { MOTION, SCENES, drawable, gsap, useGSAP } from '../lib/gsap'
import { FlowArrow } from './ui/Doodles'
import Rich from './ui/Rich'
import { RoughCircle, StickyNote, Tack, Tape } from './ui/Sketch'

const icons = { frontend: LayoutTemplate, backend: Server, database: Database, tools: Wrench, ai: BrainCircuit }

export default function Skills() {
  const stage = useRef(null)
  const flow = skills.groups.filter((group) => !group.pinned)
  const pinned = skills.groups.filter((group) => group.pinned)

  useGSAP(
    () => {
      const q = gsap.utils.selector(stage)
      gsap.matchMedia().add({ scene: SCENES, motion: MOTION }, ({ conditions }) => {
        if (!conditions.motion) return
        const arrows = drawable(stage.current)

        if (conditions.scene) {
          // Scroll to expand: a small sheet on the desk grows to fill the screen, then the stack is drawn onto it.
          gsap
            .timeline({ scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 } })
            .fromTo(q('[data-sheet]'), { scale: 0.4, rotate: -6, yPercent: 8 }, { scale: 1, rotate: 0, yPercent: 0, duration: 1, ease: 'power2.inOut' })
            .from(q('[data-box]'), { y: 50, opacity: 0, rotate: (i) => (i % 2 ? 4 : -4), stagger: 0.14, duration: 0.35, ease: 'back.out(1.5)' }, 0.9)
            .to(arrows, { strokeDashoffset: 0, duration: 0.25, stagger: 0.18 }, 1.15)
            .from(q('[data-pinned]'), { scale: 0.5, rotate: 12, autoAlpha: 0, duration: 0.3, stagger: 0.12, ease: 'back.out(2)' }, 1.35)
            .to({}, { duration: 0.35 })
        } else {
          gsap
            .timeline({ scrollTrigger: { trigger: q('[data-flow]')[0], start: 'top 80%', once: true } })
            .from(q('[data-box]'), { y: 40, opacity: 0, stagger: 0.12, duration: 0.6, ease: 'back.out(1.4)' })
            .to(arrows, { strokeDashoffset: 0, duration: 0.45, stagger: 0.15 }, 0.35)
            .from(q('[data-pinned]'), { scale: 0.6, rotate: 14, autoAlpha: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(2)' }, 0.2)
        }
      })
    },
    { scope: stage },
  )

  return (
    <section id="skills" aria-labelledby="skills-title">
      <div ref={stage} className="relative scene:h-[230vh]">
        <div className="py-16 md:py-24 scene:sticky scene:top-0 scene:flex scene:h-[100svh] scene:items-center scene:overflow-hidden scene:py-0 scene:pt-16">
          <div className="shell scene:max-w-none scene:px-8">
            <div
              data-sheet
              className="relative mx-auto rounded-wobbly-md border-[3px] border-ink bg-card p-6 shadow-sketch-lg sm:p-10 scene:flex scene:h-[calc(100svh-7.5rem)] scene:max-w-336 scene:flex-col scene:justify-center scene:px-16 scene:py-7!"
            >
              <Tape className="-left-5 top-6 rotate-[-38deg]" />
              <Tape className="-right-5 bottom-8 rotate-[-38deg]" />

              <div className="grid items-start gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <StickyNote className="rotate-2">{skills.label}</StickyNote>
                  <h2 id="skills-title" className="mt-6 scene:mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
                    {skills.heading}
                  </h2>
                  <p className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-soft md:text-2xl scene:mt-6 scene:text-xl! scene:leading-snug!">
                    <Rich text={skills.intro} />
                  </p>
                </div>

                {pinned.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-2 lg:mt-2 lg:w-76 lg:grid-cols-1 lg:gap-4 xl:w-144 xl:grid-cols-2">
                    {pinned.map((group, i) => (
                      <PinnedGroup key={group.name} group={group} tilt={i % 2 ? '-rotate-2' : 'rotate-2'} />
                    ))}
                  </div>
                )}
              </div>

              <ul data-flow className="mt-14 grid gap-20 lg:grid-cols-3 lg:gap-16 scene:mt-8">
                {flow.map((group, i) => (
                  <li key={group.name} data-box className="relative">
                    <StackBox group={group} />
                    {i < flow.length - 1 && <Connector label={skills.flowLabels?.[i]} />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StackBox({ group }) {
  const Icon = icons[group.icon] ?? Wrench
  return (
    <article className="h-full rounded-wobbly-md border-2 border-ink bg-card p-6 scene:p-5 shadow-sketch transition-[rotate,translate,box-shadow] duration-100 hover:-translate-y-1 hover:-rotate-1 hover:shadow-sketch-lg">
      <div className="flex items-center gap-4">
        <RoughCircle className="size-14 text-marker-ink">
          <Icon size={26} strokeWidth={2.5} aria-hidden="true" />
        </RoughCircle>
        <div>
          <h3 className="text-3xl leading-tight">{group.name}</h3>
          {group.note && <p className="mt-1 text-lg text-ink-soft">{group.note}</p>}
        </div>
      </div>
      <ul className="mt-6 flex flex-wrap gap-2.5 scene:mt-4 scene:gap-2" aria-label={`${group.name} skills`}>
        {group.items.map((skill) => (
          <li key={skill} className="rounded-wobbly border-2 border-ink bg-paper px-3.5 py-0.5 text-xl scene:px-3 scene:text-lg">
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}

/** The hand-drawn arrow between two stack boxes: right on wide screens, down on phones. */
function Connector({ label }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-full flex h-20 -translate-x-1/2 items-center gap-1 text-pen lg:left-auto lg:right-[-4.1rem] lg:top-1/2 lg:h-auto lg:w-16 lg:-translate-y-1/2 lg:translate-x-0 lg:flex-col">
      <FlowArrow down className="h-9 w-14 lg:hidden" />
      <FlowArrow className="hidden h-8 w-16 lg:block" />
      {label && (
        <span className="whitespace-nowrap text-lg lg:absolute lg:bottom-full lg:left-1/2 lg:mb-1 lg:w-16 lg:-translate-x-1/2 lg:-rotate-6 lg:whitespace-normal lg:text-center lg:text-base lg:leading-tight">
          {label}
        </span>
      )}
    </div>
  )
}

function PinnedGroup({ group, tilt }) {
  const Icon = icons[group.icon] ?? Wrench
  return (
    <div data-pinned className="relative">
      <div className={`relative h-full bg-postit px-5 pb-5 pt-7 shadow-sketch ${tilt}`}>
        <Tack className="-top-2.5 left-1/2 -translate-x-1/2" />
        <h3 className="flex items-center gap-3 text-2xl leading-tight">
          <Icon size={22} strokeWidth={2.5} aria-hidden="true" className="text-marker-ink" />
          {group.name}
        </h3>
        {group.note && <p className="mt-2 text-lg text-ink-soft">{group.note}</p>}
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={`${group.name} skills`}>
          {group.items.map((skill) => (
            <li key={skill} className="rounded-wobbly border-2 border-dashed border-ink px-3 py-0.5 text-xl">
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
