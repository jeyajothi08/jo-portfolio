import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, LoaderCircle, Send } from 'lucide-react'
import { contact, profile, ui } from '../data/portfolio'
import { external, isPlaceholder } from '../lib/utils'
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons'
import { Arrow } from './ui/Doodles'
import { Item, Reveal } from './ui/Reveal'
import Rich from './ui/Rich'
import SectionHeading from './ui/SectionHeading'
import { RoughCircle, SketchButton, Tape } from './ui/Sketch'

const formReady = !isPlaceholder(contact.formspreeId)

export default function Contact() {
  const [toast, setToast] = useState('')
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    let ok = true
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      ok = copyWithSelection(profile.email)
    }
    setCopied(ok)
    setToast(ok ? contact.copied : contact.copyFailed)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setToast('')
      setCopied(false)
    }, 2400)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-20 md:py-28">
      <div className="shell grid gap-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
        <div>
          <SectionHeading id="contact-title" label={contact.label} title={contact.heading} intro={contact.intro} tilt="-rotate-2" />

          <Reveal className="mt-12">
            <Item className="relative flex flex-wrap items-center gap-4">
              <span aria-hidden="true" className="pointer-events-none absolute -top-12 right-2 hidden items-start lg:flex">
                <span className="-mr-1 mt-1 -rotate-8 font-display text-2xl text-marker-ink">{contact.arrowNote}</span>
                <Arrow className="h-14 w-20 rotate-24 text-ink" dashed />
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="break-all font-display text-[clamp(1.4rem,5.4vw,2.25rem)] font-bold leading-tight underline decoration-marker decoration-wavy decoration-2 underline-offset-8 transition-colors hover:text-marker-ink lg:text-[clamp(1.6rem,2.4vw,2.25rem)]"
              >
                {profile.email}
              </a>
              <RoughCircle
                as="button"
                type="button"
                onClick={copyEmail}
                aria-label={contact.copyLabel}
                title={contact.copyLabel}
                className="size-12 shadow-sketch-sm transition-[rotate,background-color,translate] duration-100 hover:-rotate-6 hover:bg-postit active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {copied ? (
                  <Check size={20} strokeWidth={3} aria-hidden="true" className="text-pen" />
                ) : (
                  <Copy size={20} strokeWidth={2.5} aria-hidden="true" />
                )}
              </RoughCircle>
            </Item>

            <Item className="mt-10 flex flex-wrap gap-4">
              <SocialButton href={profile.socials.linkedin} label={ui.linkedin} Icon={LinkedInIcon} />
              <SocialButton href={profile.socials.github} label={ui.github} Icon={GitHubIcon} />
            </Item>
          </Reveal>
        </div>

        <Reveal>
          <Item>
            <ContactForm />
          </Item>
        </Reveal>
      </div>

      <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
        <p
          className={`inline-flex items-center gap-2 rounded-wobbly-md border-2 border-ink bg-postit px-5 py-3 text-xl shadow-sketch transition-[opacity,translate,rotate,visibility] duration-200 ${
            toast ? 'visible translate-y-0 -rotate-2 opacity-100' : 'invisible translate-y-4 rotate-0 opacity-0'
          }`}
        >
          {toast && (
            <>
              <Check size={20} strokeWidth={3} aria-hidden="true" className="text-pen" />
              {toast}
            </>
          )}
        </p>
      </div>
    </section>
  )
}

function SocialButton({ href, label, Icon }) {
  return (
    <SketchButton href={href} {...external} variant="secondary" size="sm" className="group">
      <Icon size={18} />
      {label}
      <ArrowUpRight size={18} strokeWidth={2.5} aria-hidden="true" className="transition-[translate] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      <span className="sr-only">{ui.newTab}</span>
    </SketchButton>
  )
}

const fieldClass =
  'mt-2 block w-full min-w-0 rounded-wobbly border-2 border-ink bg-paper px-4 py-3 text-xl text-ink placeholder:text-ink/50 transition-[border-color,box-shadow] focus:border-pen focus:outline-none focus:ring-4 focus:ring-pen/20'

function ContactForm() {
  const [status, setStatus] = useState('idle')
  const f = contact.form

  const onSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    if (!formReady) {
      const name = String(data.get('name') || '').trim()
      const subject = name ? `${f.mailtoSubject} (${name})` : f.mailtoSubject
      const body = `${data.get('message') || ''}\n\n${name}\n${data.get('email') || ''}`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('sending')
    try {
      const response = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  const message = { sent: f.sent, error: f.error, mailto: f.mailtoOpened }[status]

  return (
    <form
      onSubmit={onSubmit}
      aria-labelledby="contact-form-title"
      className="relative rotate-1 rounded-wobbly-md border-[3px] border-ink bg-card p-6 shadow-sketch-lg sm:p-9"
    >
      <Tape className="-top-4 left-1/2 -translate-x-1/2 -rotate-2" />
      <h3 id="contact-form-title" className="text-4xl">
        {f.heading}
      </h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-xl">
            {f.name}
          </label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required placeholder={f.namePlaceholder} className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-xl">
            {f.email}
          </label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required placeholder={f.emailPlaceholder} className={fieldClass} />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="contact-message" className="text-xl">
          {f.message}
        </label>
        <textarea id="contact-message" name="message" rows={5} required placeholder={f.messagePlaceholder} className={`${fieldClass} resize-y`} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4">
        <SketchButton as="button" type="submit" disabled={status === 'sending'} className="disabled:cursor-wait disabled:opacity-70">
          {status === 'sending' ? f.sending : f.submit}
          {status === 'sending' ? (
            <LoaderCircle size={22} strokeWidth={2.5} aria-hidden="true" className="animate-spin" />
          ) : (
            <Send size={22} strokeWidth={2.5} aria-hidden="true" />
          )}
        </SketchButton>
        <p role="status" aria-live="polite" className={`text-lg ${status === 'error' ? 'text-marker-ink' : 'text-ink-soft'}`}>
          {message}
          {status === 'error' && (
            <>
              {' '}
              <a href={`mailto:${profile.email}`} className="underline underline-offset-2">
                {profile.email}
              </a>
            </>
          )}
        </p>
      </div>

      {!formReady && (
        <p className="mt-6 text-lg text-ink-soft">
          <Rich text={f.notConnected} />
        </p>
      )}
    </form>
  )
}

// Fallback for browsers without the async clipboard API (or when it is blocked).
function copyWithSelection(text) {
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.opacity = '0'
  document.body.appendChild(area)
  area.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  area.remove()
  return ok
}
