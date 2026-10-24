import { useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { projects, ui } from '../data/portfolio'
import { MOTION, gsap, useGSAP } from '../lib/gsap'
import { external, isPlaceholder } from '../lib/utils'
import { GitHubIcon } from './ui/BrandIcons'
import Rich from './ui/Rich'
import SectionHeading from './ui/SectionHeading'
import { CornerMarks, RoughCircle, StickyNote, Tack } from './ui/Sketch'

const ALL = projects.filters[0]
const tilts = ['-rotate-1', 'rotate-1', 'rotate-[0.6deg]']
const dealtTilt = [-7, 6, -4]
const plain = (text) => text.replace(/\[[^\]]*\]\s*/g, '').trim()

export default function Projects() {
  const [filter, setFilter] = useState(ALL)
  const grid = useRef(null)
  const filtered = useRef(false)
  const shown = projects.items.filter((project) => filter === ALL || project.category === filter)
  const count = (name) => (name === ALL ? projects.items.length : projects.items.filter((p) => p.category === name).length)

  // Cards are dealt onto the table: the first time on scroll, then again each time the filter changes.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        const deal = { y: 80, rotate: (i) => dealtTilt[i % 3], opacity: 0, duration: 0.8, ease: 'back.out(1.3)', stagger: 0.1 }
        if (filtered.current) gsap.from(grid.current.children, { ...deal, y: 40, duration: 0.55 })
        else gsap.from(grid.current.children, { ...deal, scrollTrigger: { trigger: grid.current, start: 'top 85%', once: true } })
      })
    },
    { scope: grid, dependencies: [filter], revertOnUpdate: true },
  )

  const choose = (name) => {
    filtered.current = true
    setFilter(name)
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-20 md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="projects-title" label={projects.label} title={projects.heading} intro={projects.intro} tilt="-rotate-1" />

          <div role="group" aria-label={projects.filterLabel} className="flex flex-wrap gap-3">
            {projects.filters.map((name) => {
              const active = filter === name
              return (
                <button
                  key={name}
                  type="button"
                  aria-pressed={active}
                  onClick={() => choose(name)}
                  className={`inline-flex min-h-12 items-center gap-2.5 rounded-wobbly border-2 border-ink px-5 text-xl transition-[translate,box-shadow,background-color] duration-100 ${
                    active
                      ? 'translate-x-0.5 translate-y-0.5 bg-ink text-paper shadow-sketch-sm'
                      : 'bg-card shadow-sketch hover:translate-x-0.5 hover:translate-y-0.5 hover:bg-postit hover:shadow-sketch-sm'
                  }`}
                >
                  {name}
                  <span className={`grid size-7 place-items-center rounded-blob text-base ${active ? 'bg-paper text-ink' : 'bg-muted'}`}>
                    {count(name)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <ul ref={grid} className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => {
            const index = projects.items.indexOf(project)
            return (
              <li key={project.title + project.category}>
                <ProjectCard project={project} tilt={tilts[index % tilts.length]} />
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function ProjectCard({ project, tilt }) {
  const name = plain(project.title) || project.category
  const [imageFailed, setImageFailed] = useState(false)
  const hasImage = project.image && !imageFailed

  return (
    <article
      className={`group relative flex h-full flex-col rounded-wobbly-md border-2 border-ink bg-card p-4 shadow-sketch transition-[rotate,translate,box-shadow] duration-100 hover:-translate-y-1 hover:rotate-0 hover:shadow-sketch-lg ${tilt}`}
    >
      <Tack className="-top-2.5 left-1/2 -translate-x-1/2" />

      <div className="relative aspect-video overflow-hidden rounded-wobbly-md border-2 border-ink">
        {hasImage ? (
          <img
            src={project.image}
            alt={`Screenshot of ${name}`}
            width="1280"
            height="720"
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-[scale] duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            role="img"
            aria-label={`Image placeholder for ${name}`}
            className="hatch absolute inset-0 flex flex-col items-center justify-center transition-[scale] duration-500 ease-out group-hover:scale-105"
          >
            <CornerMarks />
            {/* Line height covers Kalam's tall glyph box so the doodle never runs into the tag below. */}
            <span aria-hidden="true" className="-rotate-6 font-display text-6xl font-bold leading-[1.6] text-ink">
              {projects.doodles?.[project.category] ?? '{ }'}
            </span>
            <span aria-hidden="true" className="whitespace-nowrap text-lg">
              <Rich text={projects.imagePlaceholder} />
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-3">
          <StickyNote className="-rotate-2 px-2.5 py-0 text-lg">{project.category}</StickyNote>
          <div className="flex items-center gap-2">
            <ProjectLink href={project.liveUrl} label={`${projects.liveLabel}: ${name}`}>
              <ExternalLink size={18} strokeWidth={2.5} aria-hidden="true" />
            </ProjectLink>
            <ProjectLink href={project.codeUrl} label={`${projects.codeLabel}: ${name}`}>
              <GitHubIcon size={18} />
            </ProjectLink>
          </div>
        </div>

        <h3 className="mt-4 text-3xl leading-tight">
          <Rich text={project.title} />
        </h3>
        <p className="mt-2 text-xl leading-relaxed">
          <Rich text={project.description} />
        </p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Built with">
          {project.tags.map((tag) => (
            <li key={tag} className="rounded-wobbly border-2 border-dashed border-ink px-3 py-0.5 text-lg">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function ProjectLink({ href, label, children }) {
  if (isPlaceholder(href)) {
    return (
      <RoughCircle
        role="img"
        aria-label={`${label} (${projects.missingLink})`}
        title={projects.missingLink}
        className="size-11 cursor-not-allowed border-dashed text-ink-soft opacity-60"
      >
        {children}
      </RoughCircle>
    )
  }
  return (
    <RoughCircle
      as="a"
      href={href}
      {...external}
      aria-label={`${label} ${ui.newTab}`}
      title={label}
      className="size-11 transition-[rotate,background-color] duration-100 hover:-rotate-6 hover:bg-postit"
    >
      {children}
    </RoughCircle>
  )
}
