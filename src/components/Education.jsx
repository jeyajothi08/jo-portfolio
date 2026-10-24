import { GraduationCap, MapPin } from 'lucide-react'
import { education } from '../data/portfolio'
import { CircleScribble } from './ui/Doodles'
import { Item, Reveal } from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { RoughCircle, Tape } from './ui/Sketch'

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-20 md:py-28">
      <div className="shell grid items-center gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <SectionHeading id="education-title" label={education.label} title={education.heading} tilt="rotate-1" />

        <Reveal className="space-y-10">
          {education.items.map((item) => (
            <Item key={item.degree}>
              {/* An index card, taped down at both corners. */}
              <article
                style={{ '--margin': '2.25rem' }}
                className="ruled relative -rotate-1 rounded-wobbly-md border-[3px] border-ink px-7 pb-9 pl-14 pt-12 shadow-sketch-lg transition-[rotate] duration-100 hover:rotate-0 sm:pl-16 sm:pr-10"
              >
                <Tape className="-top-3.5 left-8 -rotate-6" />
                <Tape className="-top-3.5 right-8 rotate-6" />

                <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
                  <RoughCircle className="size-16 bg-postit text-marker-ink">
                    <GraduationCap size={30} strokeWidth={2.5} aria-hidden="true" />
                  </RoughCircle>
                  <div>
                    <h3 className="text-3xl leading-tight md:text-4xl">{item.degree}</h3>
                    <p className="mt-2 font-display text-2xl text-pen">{item.school}</p>
                    <p className="mt-2 inline-flex items-center gap-2 text-lg text-ink-soft">
                      <MapPin size={18} strokeWidth={2.5} aria-hidden="true" />
                      {item.location}
                    </p>
                    <p className="relative ml-6 mt-8 w-max font-display text-3xl font-bold">
                      {item.start} – {item.end}
                      <CircleScribble className="pointer-events-none absolute -inset-x-6 -inset-y-4 h-[calc(100%+2rem)] w-[calc(100%+3rem)] text-marker sm:-inset-x-10 sm:-inset-y-5 sm:h-[calc(100%+2.5rem)] sm:w-[calc(100%+5rem)]" />
                    </p>
                  </div>
                </div>
              </article>
            </Item>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
