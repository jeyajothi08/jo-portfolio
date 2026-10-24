import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { footer, profile } from '../data/portfolio'
import { MOTION, drawable, gsap, useGSAP } from '../lib/gsap'
import { Underline } from './ui/Doodles'

export default function Footer() {
  const year = new Date().getFullYear()
  const root = useRef(null)

  // The name gets its marker underline as the page comes to an end.
  useGSAP(
    () => {
      gsap.matchMedia().add(MOTION, () => {
        gsap.to(drawable(root.current), {
          strokeDashoffset: 0,
          duration: 0.9,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        })
      })
    },
    { scope: root },
  )

  return (
    <footer ref={root} className="overflow-x-clip pb-10 pt-8">
      <div className="shell [container-type:inline-size]">
        <div className="border-t-[3px] border-dashed border-ink/30 pt-14">
          {/* Sized in container units so the name always spans the content width. */}
          <p aria-hidden="true" className="select-none whitespace-nowrap font-display text-[18.5cqi] font-bold leading-[1.1]">
            <span className="relative inline-block">
              {profile.name}
              <span className="text-marker">.</span>
              <Underline className="absolute -bottom-[0.05em] left-[1%] h-[0.16em] w-[96%] text-marker" />
            </span>
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 text-xl sm:flex-row sm:items-center sm:justify-between">
          <p>
            {footer.credit} · © {year}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 self-start decoration-marker decoration-[3px] hover:line-through sm:self-auto"
          >
            {footer.backToTop}
            <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
