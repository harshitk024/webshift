import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import '../styles/gradient-carousel.css'

const INITIAL_SLOT = 15
const TRACK_ITEMS = 31
const REBASE_STEP = 9
const REBASE_HIGH = 21
const REBASE_LOW = 9
const ARTWORKS: Record<string, string> = {
  'jaswant-telecom': 'gradient-carousel__art--jaswant',
  'northline-air': 'gradient-carousel__art--air',
  'helio-field-solar': 'gradient-carousel__art--solar',
}

function projectAt(position: number) {
  return projects[((position % projects.length) + projects.length) % projects.length]
}

function ProjectArtwork({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className={`gradient-carousel__art ${ARTWORKS[project.slug] ?? ''}`}>
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
  const pointerRef = useRef<{
    id: number
    startX: number
    startTrackX: number
    lastX: number
    lastTime: number
    velocity: number
  } | null>(null)
  const draggedRef = useRef(false)
  const lastWheelRef = useRef(0)
  const reduceMotion = useReducedMotion()
  const [windowState, setWindowState] = useState({ base: 0, active: INITIAL_SLOT })
  const [stageWidth, setStageWidth] = useState(1120)

  const { base, active: activeSlot } = windowState
  const activePosition = base + activeSlot
  const cardWidth = Math.min(354, Math.max(230, stageWidth * 0.295))
  const cardGap = 26
  const step = cardWidth + cardGap
  const targetX = stageWidth / 2 - cardWidth / 2 - activeSlot * step
  const trackX = useMotionValue(
    1120 / 2 - 330.4 / 2 - INITIAL_SLOT * (330.4 + cardGap),
  )
  const activeProject = projectAt(activePosition)

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

  useEffect(() => {
    const controls = animate(
      trackX,
      targetX,
      reduceMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 138, damping: 25, mass: 0.84 },
    )
    return () => controls.stop()
  }, [activeSlot, targetX, reduceMotion, trackX])

  const goTo = (requestedSlot: number) => {
    let nextBase = base
    let nextSlot = Math.max(0, Math.min(TRACK_ITEMS - 1, requestedSlot))
    let shift = 0

    while (nextSlot >= REBASE_HIGH) {
      nextSlot -= REBASE_STEP
      shift += REBASE_STEP
    }

    while (nextSlot <= REBASE_LOW) {
      nextSlot += REBASE_STEP
      shift -= REBASE_STEP
    }

    if (shift !== 0) {
      // Move the track by the same distance that the coordinate window shifts.
      // Keys are global indices, so existing cards keep their DOM identity.
      trackX.jump(trackX.get() + shift * step)
      nextBase += shift
    }

    setWindowState({ base: nextBase, active: nextSlot })
  }

  const goPrevious = () => goTo(activeSlot - 1)
  const goNext = () => goTo(activeSlot + 1)

  const snapToCurrent = () => {
    animate(
      trackX,
      targetX,
      reduceMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 138, damping: 25, mass: 0.84 },
    )
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return

    event.currentTarget.setPointerCapture(event.pointerId)
    pointerRef.current = {
      id: event.pointerId,
      startX: event.clientX,
      startTrackX: trackX.get(),
      lastX: event.clientX,
      lastTime: performance.now(),
      velocity: 0,
    }
    draggedRef.current = false
    trackX.stop()
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return

    const now = performance.now()
    const elapsed = Math.max(1, now - pointer.lastTime)
    const delta = event.clientX - pointer.lastX
    pointer.velocity = delta / elapsed
    pointer.lastX = event.clientX
    pointer.lastTime = now

    const distance = event.clientX - pointer.startX
    if (Math.abs(distance) > 5) draggedRef.current = true
    trackX.set(pointer.startTrackX + distance)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointer = pointerRef.current
    if (!pointer || pointer.id !== event.pointerId) return

    const distance = event.clientX - pointer.startX
    const projectedX = trackX.get() + pointer.velocity * 210
    const projectedSlot = Math.max(
      2,
      Math.min(
        TRACK_ITEMS - 3,
        Math.round((stageWidth / 2 - cardWidth / 2 - projectedX) / step),
      ),
    )

    pointerRef.current = null
    if (Math.abs(distance) > 5) draggedRef.current = true

    if (draggedRef.current && projectedSlot !== activeSlot) {
      goTo(projectedSlot)
    } else {
      snapToCurrent()
    }
  }

  const handlePointerCancel = () => {
    pointerRef.current = null
    snapToCurrent()
  }

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY
    if (Math.abs(delta) < 24) return

    event.preventDefault()
    const now = performance.now()
    if (now - lastWheelRef.current < 360) return
    lastWheelRef.current = now

    if (delta > 0) goNext()
    else goPrevious()
  }

  const selectPosition = (slot: number) => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }
    goTo(slot)
  }

  const cssVars = {
    '--carousel-accent': activeProject.accent,
    '--carousel-card-width': `${cardWidth}px`,
    '--carousel-card-gap': `${cardGap}px`,
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
        onWheel={handleWheel}
      >
        <motion.div
          className="gradient-carousel__track"
          style={{ x: trackX, y: -cardWidth / 2 }}
        >
          {Array.from({ length: TRACK_ITEMS }, (_, slot) => {
            const globalIndex = base + slot
            const offset = slot - activeSlot
            const project = projectAt(globalIndex)
            const distance = Math.abs(offset)
            const scale = distance === 0 ? 1 : distance === 1 ? 0.92 : distance === 2 ? 0.84 : 0.78
            const cardStyle = {
              width: cardWidth,
              height: cardWidth,
              zIndex: 20 - distance,
              opacity: distance > 3 ? 0 : distance === 3 ? 0.58 : 1,
              pointerEvents: distance > 2 ? 'none' : 'auto',
              transform: `translateZ(-${distance * 34}px) rotateY(${offset * -15}deg) rotateZ(${offset === 0 ? 0 : offset * -0.8}deg) scale(${scale})`,
            } as CSSProperties

            return (
              <button
                key={globalIndex}
                type="button"
                className={`gradient-carousel__card ${distance === 0 ? 'is-active' : ''}`}
                style={cardStyle}
                aria-label={`${project.name}, ${distance === 0 ? 'selected' : 'select project'}`}
                aria-pressed={distance === 0}
                onClick={() => selectPosition(slot)}
                tabIndex={distance <= 2 ? 0 : -1}
              >
                <ProjectArtwork project={project} />
              </button>
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
            const forward = (index - selectedIndex + projects.length) % projects.length
            const backward = forward - projects.length
            return (
              <button
                key={project.slug}
                type="button"
                className={`gradient-carousel__dot ${selectedIndex === index ? 'is-active' : ''}`}
                onClick={() => goTo(activeSlot + (Math.abs(forward) <= Math.abs(backward) ? forward : backward))}
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
