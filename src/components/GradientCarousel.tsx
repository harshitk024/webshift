import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import '../styles/gradient-carousel.css'

const artworkClasses: Record<string, string> = {
  'jaswant-telecom': 'gradient-carousel__art--jaswant',
  'northline-air': 'gradient-carousel__art--air',
  'helio-field-solar': 'gradient-carousel__art--solar',
}

function projectAt(position: number) {
  return projects[((position % projects.length) + projects.length) % projects.length]
}

function ProjectArtwork({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`gradient-carousel__art ${artworkClasses[project.slug] ?? ''}`}>
      <div className="gradient-carousel__art-grain" aria-hidden="true" />
      <span className="gradient-carousel__art-shape gradient-carousel__art-shape--orb" aria-hidden="true" />
      <span className="gradient-carousel__art-shape gradient-carousel__art-shape--ring" aria-hidden="true" />
      <span className="gradient-carousel__art-shape gradient-carousel__art-shape--ribbon" aria-hidden="true" />
      <span className="gradient-carousel__art-shape gradient-carousel__art-shape--block" aria-hidden="true" />

      <div className="gradient-carousel__art-header">
        <span>WEBSHIFT®</span>
        <span>{project.index} / 03</span>
      </div>

      <div className="gradient-carousel__art-footer">
        <span className="gradient-carousel__art-name">{project.name}</span>
        <span className="gradient-carousel__art-industry">{project.industry}</span>
      </div>
    </div>
  )
}

export function GradientCarousel() {
  const stageRef = useRef<HTMLDivElement>(null)
  const pointerRef = useRef<{ x: number; dragX: number; id: number } | null>(null)
  const draggedRef = useRef(false)
  const reduceMotion = useReducedMotion()
  const [activePosition, setActivePosition] = useState(0)
  const [stageWidth, setStageWidth] = useState(1120)

  const cardWidth = Math.min(354, Math.max(230, stageWidth * 0.295))
  const cardGap = 26
  const step = cardWidth + cardGap
  const dragX = useMotionValue(0)
  const activeProject = projectAt(activePosition)
  const visiblePositions = Array.from({ length: 5 }, (_, index) => activePosition + index - 2)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width
      if (width) setStageWidth(width)
    })

    observer.observe(stage)
    return () => observer.disconnect()
  }, [])

  const settleDrag = () => {
    animate(
      dragX,
      0,
      reduceMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 220, damping: 28, mass: 0.7 },
    )
  }

  const goTo = (position: number) => {
    setActivePosition(position)
    settleDrag()
  }

  const goPrevious = () => goTo(activePosition - 1)
  const goNext = () => goTo(activePosition + 1)

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    event.currentTarget.setPointerCapture(event.pointerId)
    pointerRef.current = {
      x: event.clientX,
      dragX: dragX.get(),
      id: event.pointerId,
    }
    draggedRef.current = false
    dragX.stop()
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return

    const distance = event.clientX - pointer.x
    if (Math.abs(distance) > 7) draggedRef.current = true
    dragX.set(pointer.dragX + distance)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return

    const distance = event.clientX - pointer.x
    pointerRef.current = null

    if (Math.abs(distance) > Math.max(54, step * 0.16)) {
      const count = Math.max(1, Math.min(3, Math.round(Math.abs(distance) / step)))
      setActivePosition((position) => position + (distance < 0 ? count : -count))
    }

    settleDrag()
  }

  const handlePointerCancel = () => {
    pointerRef.current = null
    settleDrag()
  }

  const cssVars = {
    '--carousel-accent': activeProject.accent,
  } as CSSProperties

  return (
    <div className="gradient-carousel" style={cssVars}>
      <div className="gradient-carousel__ambient" aria-hidden="true">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={activeProject.slug}
            className="gradient-carousel__ambient-layer"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: `radial-gradient(ellipse 54% 78% at 50% 48%, ${activeProject.accent}75 0%, ${activeProject.accent}36 34%, ${activeProject.accent}12 64%, transparent 82%)`,
            }}
          />
        </AnimatePresence>
      </div>

      <div
        ref={stageRef}
        className="gradient-carousel__stage"
        role="region"
        aria-label="Selected website concepts"
        aria-roledescription="carousel"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            goPrevious()
          } else if (event.key === 'ArrowRight') {
            event.preventDefault()
            goNext()
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        <motion.div className="gradient-carousel__track" style={{ x: dragX }}>
          {visiblePositions.map((virtualPosition) => {
            const offset = virtualPosition - activePosition
            const project = projectAt(virtualPosition)
            const distance = Math.abs(offset)
            const scale = distance === 0 ? 1 : distance === 1 ? 0.91 : 0.82

            return (
              <motion.button
                key={virtualPosition}
                type="button"
                className={`gradient-carousel__card ${distance === 0 ? 'is-active' : ''}`}
                style={{
                  width: cardWidth,
                  height: cardWidth,
                  marginLeft: -cardWidth / 2,
                  marginTop: -cardWidth / 2,
                  zIndex: 10 - distance,
                }}
                initial={false}
                animate={{
                  x: offset * step,
                  rotateY: offset * -19,
                  rotateZ: offset === 0 ? 0 : offset * -1.2,
                  scale,
                  z: -distance * 46,
                  opacity: 1,
                }}
                transition={reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 118, damping: 22, mass: 0.9 }}
                aria-label={`${project.name}, ${distance === 0 ? 'selected' : 'select project'}`}
                aria-pressed={distance === 0}
                onClick={() => {
                  if (draggedRef.current) {
                    draggedRef.current = false
                    return
                  }
                  goTo(virtualPosition)
                }}
              >
                <ProjectArtwork project={project} />
              </motion.button>
            )
          })}
        </motion.div>
      </div>

      <div className="gradient-carousel__controls">
        <button
          type="button"
          className="gradient-carousel__arrow"
          onClick={goPrevious}
          aria-label="Previous project"
        >
          <ArrowLeft size={17} aria-hidden="true" />
        </button>

        <div className="gradient-carousel__pagination" aria-label="Choose a project">
          {projects.map((project, index) => {
            const selectedIndex = ((activePosition % projects.length) + projects.length) % projects.length
            return (
              <button
                key={project.slug}
                type="button"
                className={`gradient-carousel__dot ${selectedIndex === index ? 'is-active' : ''}`}
                onClick={() => {
                  const forward = (index - selectedIndex + projects.length) % projects.length
                  const backward = forward - projects.length
                  goTo(activePosition + (Math.abs(forward) <= Math.abs(backward) ? forward : backward))
                }}
                aria-label={`Show ${project.name}`}
                aria-current={selectedIndex === index ? 'true' : undefined}
              />
            )
          })}
        </div>

        <button
          type="button"
          className="gradient-carousel__arrow"
          onClick={goNext}
          aria-label="Next project"
        >
          <ArrowRight size={17} aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeProject.slug}
          className="gradient-carousel__caption"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.3, ease: 'easeOut' }}
          aria-live="polite"
          aria-atomic="true"
        >
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
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
