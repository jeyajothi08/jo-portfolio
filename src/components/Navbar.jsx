import { useEffect, useRef, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { nav, profile, ui } from '../data/portfolio'
import { useActiveSection } from '../lib/hooks'
import { gsap, useGSAP } from '../lib/gsap'
import { downloadFile } from '../lib/utils'
import { RoughCircle, SketchButton } from './ui/Sketch'

// Every section is watched so the highlight clears in sections that have no nav link.
const WATCHED = ['top', ...nav.links.map((link) => link.href.slice(1)), 'education']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(WATCHED)
  const menuButton = useRef(null)
  const firstLink = useRef(null)
  const progress = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    firstLink.current?.focus()
    const onKey = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    const desktop = window.matchMedia('(min-width: 768px)')
    const onResize = (event) => event.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    desktop.addEventListener('change', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      desktop.removeEventListener('change', onResize)
    }
  }, [open])

  // A red marker line under the bar that fills as you read down the page.
  useGSAP(() => {
    gsap.fromTo(progress.current, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } })
  })

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b-2 border-dashed transition-[background-color,border-color] duration-200 ${
        solid ? 'border-ink/30 bg-paper/95 backdrop-blur-sm' : 'border-transparent'
      }`}
    >
      <nav aria-label={ui.primaryNav} className="shell flex h-16 items-center justify-between gap-3 md:h-20">
        <a
          href="#top"
          aria-label={ui.logoLabel}
          className="font-display text-3xl font-bold leading-none transition-[rotate] duration-100 hover:-rotate-6 md:text-4xl"
        >
          {profile.initials}
          <span className="text-marker">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.links.map((link) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'location' : undefined}
                  className={`px-3 py-1.5 text-xl decoration-2 underline-offset-[7px] transition-colors lg:text-2xl ${
                    isActive
                      ? 'text-ink underline decoration-marker decoration-wavy'
                      : 'text-ink-soft hover:text-ink hover:underline hover:decoration-ink hover:decoration-wavy'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <SketchButton
            href={profile.resume}
            download={profile.resumeDownloadName || true}
            onClick={(e) => {
              e.preventDefault()
              downloadFile(profile.resume, profile.resumeDownloadName)
            }}
            size="sm"
            className="-rotate-1"
          >
            <Download size={18} strokeWidth={2.5} aria-hidden="true" />
            {nav.resumeLabel}
          </SketchButton>

          <RoughCircle
            as="button"
            ref={menuButton}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            className="size-11 transition-[rotate,background-color] duration-100 hover:-rotate-6 hover:bg-postit md:hidden"
          >
            {open ? <X size={22} strokeWidth={2.75} aria-hidden="true" /> : <Menu size={22} strokeWidth={2.75} aria-hidden="true" />}
          </RoughCircle>
        </div>
      </nav>

      <span ref={progress} aria-hidden="true" className="absolute -bottom-0.5 left-0 h-0.75 w-full origin-left bg-marker" />

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full border-b-[3px] border-ink bg-paper shadow-sketch md:hidden ${
          open
            ? 'visible translate-y-0 opacity-100 [transition:opacity_200ms,translate_200ms,visibility_0s]'
            : 'invisible -translate-y-3 opacity-0 [transition:opacity_200ms,translate_200ms,visibility_0s_linear_200ms]'
        }`}
      >
        <ul className="shell flex flex-col gap-1 py-5">
          {nav.links.map((link, i) => {
            const isActive = active === link.href.slice(1)
            return (
              <li key={link.href} className={i % 2 ? 'rotate-1' : '-rotate-1'}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`block px-2 py-2.5 font-display text-3xl font-bold decoration-[3px] underline-offset-8 ${
                    isActive ? 'text-marker-ink underline decoration-marker decoration-wavy' : 'text-ink hover:underline hover:decoration-wavy'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
