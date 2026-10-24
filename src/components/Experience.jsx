import { useRef } from 'react'
import { Calendar, Globe, MapPin } from 'lucide-react'
import { experience } from '../data/portfolio'
import { MOTION, gsap, useGSAP } from '../lib/gsap'
import { Tick } from './ui/Doodles'
import { Item, Reveal } from './ui/Reveal'
import Rich from './ui/Rich'
import SectionHeading from './ui/SectionHeading'
import { RoughCircle, StickyNote, Tack } from './ui/Sketch'

export default function Experience() {
  const timeline = useRef(null)

  // The marker line is drawn down the timeline as you scroll past it.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.fromTo(
          '[data-line]',
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: timeline.current, start: 'top 70%', end: 'bottom 55%', scrub: 0.4 } },
        )
      })
    },
    { scope: timeline },
  )

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-[1fr_1.75fr] lg:gap-16">
        <SectionHeading
          id="experience-title"
          label={experience.label}
          title={experience.heading}
          tilt="rotate-2"
          className="lg:sticky lg:top-32 lg:self-start"
        />

        <div ref={timeline} className="relative pl-14 sm:pl-16">
          <span aria-hidden="true" className="absolute bottom-2 left-[15px] top-2 border-l-[3px] border-dashed border-ink/30" />
          <span aria-hidden="true" data-line className="absolute bottom-2 left-[15px] top-2 w-[3px] origin-top rounded-full bg-marker" />

          <Reveal as="ol" className="space-y-14">
            {experience.items.map((job) => {
              const current = job.end === experience.presentLabel
              return (
                <Item as="li" key={`${job.company}-${job.start}`} className="relative">
                  <RoughCircle aria-hidden="true" className="absolute -left-14 top-0 size-9 sm:-left-16">
                    <span className="relative flex size-3.5">
                      {current && <span className="absolute inline-flex size-full animate-ping rounded-full bg-marker opacity-70" />}
                      <span className={`relative size-3.5 rounded-full ${current ? 'bg-marker' : 'bg-ink'}`} />
                    </span>
                  </RoughCircle>

                  <p className="text-xl text-ink-soft">
                    {job.start} – <span className={current ? 'text-marker-ink' : ''}>{job.end}</span>
                  </p>

                  <article className="relative mt-4 rounded-wobbly-md border-2 border-ink bg-card p-6 shadow-sketch transition-[rotate,box-shadow] duration-100 hover:-rotate-[0.5deg] hover:shadow-sketch-lg sm:p-9">
                    <Tack className="-top-2.5 left-1/2 -translate-x-1/2" />
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                      <h3 className="text-3xl leading-tight md:text-4xl">{job.role}</h3>
                      <StickyNote as="span" className="rotate-3 px-2.5 py-0 text-lg">
                        {job.type}
                      </StickyNote>
                    </div>
                    <p className="mt-2 text-2xl">
                      <span className="font-display font-bold text-pen">{job.company}</span>
                      {job.companyNote && <span className="text-ink-soft"> · {job.companyNote}</span>}
                    </p>

                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-lg text-ink-soft">
                      <li className="inline-flex items-center gap-2">
                        <Calendar size={18} strokeWidth={2.5} aria-hidden="true" />
                        {job.start} – {job.end}
                      </li>
                      {job.location && (
                        <li className="inline-flex items-center gap-2">
                          <MapPin size={18} strokeWidth={2.5} aria-hidden="true" />
                          {job.location}
                        </li>
                      )}
                      <li className="inline-flex items-center gap-2">
                        <Globe size={18} strokeWidth={2.5} aria-hidden="true" />
                        {job.mode}
                      </li>
                    </ul>

                    <ul className="mt-7 space-y-3.5 text-xl leading-relaxed">
                      {job.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3">
                          <Tick className="mt-1 size-6 shrink-0 text-marker" />
                          <span>
                            <Rich text={bullet} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </article>
                </Item>
              )
            })}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
