import { useEffect } from 'react'
import { ui } from './data/portfolio'
import { useSmoothScroll } from './lib/hooks'
import { ScrollTrigger } from './lib/gsap'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()

  // The handwritten fonts change the page height when they arrive; re-measure every scroll scene then.
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-3 z-60 -translate-y-24 bg-postit px-4 py-2 text-xl shadow-sketch focus:translate-y-0"
      >
        {ui.skipLink}
      </a>
      <Navbar />
      {/* Clips tilted cards and doodles at the screen edge; `clip` (unlike hidden) keeps the sticky scenes working. */}
      <main id="main" className="overflow-x-clip">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
