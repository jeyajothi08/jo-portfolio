// Hand-drawn marks. Strokes use currentColor, so a text-* class sets the ink.
// Paths marked data-draw can be drawn in by the scroll scenes (see drawable() in lib/gsap.js).

const pen = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' }

export function Underline({ className = '', width = 6 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 300 24" preserveAspectRatio="none" className={className}>
      <path data-draw pathLength="1" d="M4 15 C 46 6, 88 21, 132 12 S 214 4, 296 13" strokeWidth={width} {...pen} />
    </svg>
  )
}

export function CircleScribble({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 220 100" preserveAspectRatio="none" className={className}>
      <path
        data-draw
        pathLength="1"
        d="M30 64 C 14 36, 70 12, 122 13 C 178 14, 214 34, 205 58 C 196 84, 120 93, 70 87 C 26 82, 6 58, 30 36 C 46 23, 72 17, 96 16"
        strokeWidth="4"
        {...pen}
      />
    </svg>
  )
}

/** A curved arrow. `dashed` draws it as a pencil guide. */
export function Arrow({ className = '', dashed = false, width = 3 }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 120 80" className={className}>
      <path
        data-draw={dashed ? undefined : ''}
        pathLength={dashed ? undefined : 1}
        d="M6 12 C 40 2, 92 14, 104 62"
        strokeWidth={width}
        strokeDasharray={dashed ? '7 8' : undefined}
        {...pen}
      />
      <path d="M89 52 L104 66 L113 47" strokeWidth={width} {...pen} />
    </svg>
  )
}

/** A straight-ish arrow for diagrams, pointing right (or down with `down`). */
export function FlowArrow({ className = '', down = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 90 40" className={`${down ? 'rotate-90' : ''} ${className}`}>
      <path data-draw pathLength="1" d="M4 22 C 24 16, 48 26, 80 19" strokeWidth="3.5" {...pen} />
      <path d="M68 8 L82 19 L69 31" strokeWidth="3.5" {...pen} />
    </svg>
  )
}

export function Squiggle({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 200 30" preserveAspectRatio="none" className={className}>
      <path d="M4 16 q 12 -14 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0 t 24 0" strokeWidth="3" strokeDasharray="6 7" {...pen} />
    </svg>
  )
}

export function Star({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 40 40" className={className}>
      <path d="M20 4 L20 36 M5 20 L35 20 M9 9 L31 31 M31 9 L9 31" strokeWidth="4" {...pen} />
    </svg>
  )
}

/** A loose circle, scribbled twice round. */
export function Loop({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 100 100" className={className}>
      <path d="M50 8 C 80 6, 94 30, 92 52 C 90 80, 64 94, 44 92 C 18 89, 6 66, 9 46 C 12 22, 34 9, 56 11 C 74 13, 84 22, 88 34" strokeWidth="3.5" {...pen} />
    </svg>
  )
}

/** A small hand-drawn tick for list bullets. */
export function Tick({ className = '' }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path d="M4 13 C 6 15, 8 17, 9.5 19 C 12 13, 15 9, 20 5" strokeWidth="3" {...pen} />
    </svg>
  )
}
