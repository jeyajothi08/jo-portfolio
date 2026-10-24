import { Item, Reveal } from './Reveal'
import Rich from './Rich'
import { StickyNote } from './Sketch'

export default function SectionHeading({ id, label, title, intro, className = '', tilt = '-rotate-2' }) {
  return (
    <Reveal className={className}>
      <Item>
        <StickyNote className={tilt}>{label}</StickyNote>
      </Item>
      <Item as="h2" id={id} className="mt-6 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.25rem] xl:text-6xl">
        {title}
      </Item>
      {intro && (
        <Item as="p" className="mt-5 max-w-xl text-xl leading-relaxed text-ink-soft md:text-2xl">
          <Rich text={intro} />
        </Item>
      )}
    </Reveal>
  )
}
