// The paper pieces every section is built from. Colours, radii and shadows come from the tokens in index.css.

const button =
  'inline-flex items-center justify-center gap-2 rounded-wobbly border-[3px] border-ink leading-none text-ink shadow-sketch transition-[translate,box-shadow,background-color,color] duration-100 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-sketch-sm active:translate-x-1 active:translate-y-1 active:shadow-none'

const buttonVariants = {
  primary: 'bg-card hover:bg-marker-ink hover:text-white',
  secondary: 'bg-muted hover:bg-pen hover:text-white',
}

const buttonSizes = {
  md: 'min-h-12 px-6 py-2 text-xl md:min-h-14 md:text-2xl',
  sm: 'min-h-11 px-4 py-1.5 text-xl',
}

/** A wobbly marker-outlined button that presses flat. Renders a link by default. */
export function SketchButton({ as: Tag = 'a', variant = 'primary', size = 'md', className = '', children, ...rest }) {
  return (
    <Tag className={`${button} ${buttonVariants[variant]} ${buttonSizes[size]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/** A yellow post-it tag, used for section labels and small asides. */
export function StickyNote({ as: Tag = 'p', className = '', children, ...rest }) {
  return (
    <Tag className={`inline-block bg-postit px-3.5 py-1 text-xl leading-snug text-ink shadow-sketch-soft ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

/** An icon or control enclosed in a rough pencil circle. */
export function RoughCircle({ as: Tag = 'span', className = '', children, ...rest }) {
  return (
    <Tag className={`inline-grid shrink-0 place-items-center rounded-blob border-2 border-ink bg-card ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function Tape({ className = '' }) {
  return <span aria-hidden="true" className={`tape ${className}`} />
}

export function Tack({ className = '' }) {
  return <span aria-hidden="true" className={`tack ${className}`} />
}

/** Four pencil corner marks, like the frame drawn around a sketch. */
export function CornerMarks({ className = 'border-ink' }) {
  const mark = `absolute size-5 ${className}`
  return (
    <span aria-hidden="true">
      <span className={`${mark} left-3 top-3 border-l-[3px] border-t-[3px]`} />
      <span className={`${mark} right-3 top-3 border-r-[3px] border-t-[3px]`} />
      <span className={`${mark} bottom-3 left-3 border-b-[3px] border-l-[3px]`} />
      <span className={`${mark} bottom-3 right-3 border-b-[3px] border-r-[3px]`} />
    </span>
  )
}
