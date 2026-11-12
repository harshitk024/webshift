import { useLayoutEffect, useRef } from 'react'
import { principles } from '../data/services'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Why() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-card',
        {
          opacity: 0,
          y: 45,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 80%',
            once: true,
          },
        }
      )

      gsap.fromTo(
        '.why-heading',
        {
          opacity: 0,
          x: -35,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.why-heading',
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-graphite"
    >
      {/* Background: soft gradient + faint grid (cheap radial gradients, no blur filters) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(79,70,229,0.14),transparent)]" />
        <div className="absolute -bottom-48 -left-40 h-[520px] w-[520px] bg-[radial-gradient(closest-side,rgba(14,165,233,0.10),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-12">

        {/* Heading */}
        <div className="why-heading lg:col-span-4">
          <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-lime">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Why WebShift
          </p>

          <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.04em] text-foam md:text-5xl">
            A studio, <br />
            not a <span className="text-lime">queue.</span>
          </h2>

          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist/70">
            Good digital work is more than just delivering a project. It's
            about understanding your goals and building something that works.
          </p>

          <div className="mt-8 hidden items-center gap-3 lg:flex">
            <div className="h-px w-12 bg-lime/60" />
            <span className="text-[10px] uppercase tracking-[0.18em] text-mist/50">
              The WebShift approach
            </span>
          </div>
        </div>

        {/* Principle Cards */}
        <div className="why-grid grid gap-3 sm:grid-cols-2 lg:col-span-8">
          {principles.map((item, index) => (
            <article
              key={item.title}
              className="why-card group relative flex min-h-[190px] flex-col justify-between overflow-hidden rounded-2xl border border-ink-line bg-[#202020] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-lime/40 hover:bg-[#262626]"
            >
              {/* Number */}
              <div className="flex items-center justify-between">
                <span className="font-display text-3xl font-semibold text-lime/80 transition-transform duration-300 group-hover:scale-110">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-line text-sm text-mist/60 transition-all duration-300 group-hover:border-lime group-hover:bg-lime group-hover:text-graphite">
                  ↗
                </span>
              </div>

              {/* Content */}
              <div className="relative z-10 mt-8">
                <h3 className="font-display text-xl font-medium tracking-tight text-foam transition-colors duration-300 group-hover:text-lime">
                  {item.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-mist/65">
                  {item.text}
                </p>
              </div>

              {/* Hover decoration */}
              <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-lime/[0.04] blur-2xl transition-all duration-500 group-hover:bg-lime/[0.12]" />
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}