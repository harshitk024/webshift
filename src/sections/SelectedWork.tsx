import { Reveal } from '../components/Reveal'
import { GradientCarousel } from '../components/GradientCarousel'

export function SelectedWork() {
  return (
    <section id="work" className="bg-graphite">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <p className="text-[12px] tracking-[0.18em] text-lime uppercase">Selected work</p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-foam md:text-6xl">
              Work that speaks for itself.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-mist">
              Concept studies for the kinds of businesses Webshift is built to help. Not
              commissioned client work.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 md:mt-16">
            <GradientCarousel />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
