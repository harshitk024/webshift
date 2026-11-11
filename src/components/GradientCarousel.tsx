import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { ProjectStage } from './mockups/ProjectMockup'
import '../styles/gradient-carousel.css'

function getOffset(index: number, activeIndex: number, length: number) {
  let offset = index - activeIndex

  if (offset > length / 2) offset -= length
  if (offset < -length / 2) offset += length

  return offset
}

export function GradientCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const pointerStart = useRef<number | null>(null)
  const didSwipe = useRef(false)
  const reduceMotion = useReducedMotion()
  const activeProject = projects[activeIndex] ?? projects[0]

  const goTo = (index: number) => {
    setActiveIndex((index + projects.length) % projects.length)
  }

  const goPrevious = () => goTo(activeIndex - 1)
  const goNext = () => goTo(activeIndex + 1)

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      goPrevious()
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      goNext()
    }
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX
    didSwipe.current = false
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return

    const distance = event.clientX - pointerStart.current
    pointerStart.current = null

    if (Math.abs(distance) < 48) return

    didSwipe.current = true
    goTo(activeIndex + (distance < 0 ? 1 : -1))
  }

  const transitionDuration = reduceMotion ? 0 : 0.7

  return (
    <div
      className="gradient-carousel"
      style={{ '--carousel-accent': activeProject.accent } as CSSProperties}
    >
      <div className="gradient-carousel__ambient" aria-hidden="true">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeProject.slug}
            className="gradient-carousel__ambient-layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionDuration, ease: 'easeInOut' }}
            style={{
              background: `radial-gradient(ellipse 58% 78% at 50% 46%, ${activeProject.accent}38 0%, ${activeProject.accent}14 38%, transparent 76%)`,
            }}
          />
        </AnimatePresence>
      </div>

      <div
        className="gradient-carousel__stage"
        role="region"
        aria-label="Selected website concepts"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null
        }}
      >
        {projects.map((project, index) => {
          const offset = getOffset(index, activeIndex, projects.length)
          const selected = offset === 0
          const style = {
            '--carousel-slot': offset,
            '--carousel-scale': selected ? 1 : 0.82,
            '--project-accent': project.accent,
            '--project-paper': project.paper,
            '--project-ink': project.ink,
          } as CSSProperties

          return (
            <button
              key={project.slug}
              type="button"
              className={`gradient-carousel__card ${selected ? 'is-active' : ''}`}
              style={style}
              aria-label={`${project.name}, ${selected ? 'selected' : 'select project'}`}
              aria-pressed={selected}
              onClick={() => {
                if (didSwipe.current) {
                  didSwipe.current = false
                  return
                }
                goTo(index)
              }}
            >
              <span className="gradient-carousel__card-top" aria-hidden="true">
                <span>WEBSHIFT / WEBSITE CONCEPT</span>
                <span>{project.index} — 03</span>
              </span>

              <span className="gradient-carousel__mockup" aria-hidden="true">
                <ProjectStage project={project} />
              </span>

              <span className="gradient-carousel__card-bottom" aria-hidden="true">
                <span>{project.industry}</span>
                <span className="gradient-carousel__card-mark">W.</span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="gradient-carousel__controls">
        <button
          type="button"
          className="gradient-carousel__arrow"
          onClick={goPrevious}
          aria-label="Previous project"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>

        <div className="gradient-carousel__pagination" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              key={project.slug}
              type="button"
              className={`gradient-carousel__dot ${index === activeIndex ? 'is-active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Show ${project.name}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>

        <button
          type="button"
          className="gradient-carousel__arrow"
          onClick={goNext}
          aria-label="Next project"
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      <div className="gradient-carousel__caption" aria-live="polite" aria-atomic="true">
        <div className="gradient-carousel__caption-main">
          <p className="gradient-carousel__eyebrow">
            <span>{activeProject.index}</span>
            <span>/ 03</span>
            <span className="gradient-carousel__separator">·</span>
            <span>{activeProject.industry}</span>
          </p>
          <h3>{activeProject.name}</h3>
          <p className="gradient-carousel__summary">{activeProject.summary}</p>
          <p className="gradient-carousel__focus">Focus: {activeProject.focus}</p>
        </div>

        <Link className="gradient-carousel__link" to={`/work/${activeProject.slug}`}>
          View concept
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
}
