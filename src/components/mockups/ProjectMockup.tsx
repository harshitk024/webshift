import type { Project } from '../../data/projects'
import { BrowserChrome, PhoneChrome } from './BrowserChrome'
import { useEffect, useRef, useState } from 'react'

/**
 * Performance notes
 * - A screenshot (previewImage) is always preferred: it is instant and free to render.
 * - With no screenshot, a lightweight styled placeholder is shown instead of a live site.
 * - The real website only loads in an iframe while the visitor hovers the desktop preview,
 *   and it is removed again when they leave. Nothing heavy runs while scrolling.
 */

function Placeholder({
  project,
  compact = false,
  hint,
}: {
  project: Project
  compact?: boolean
  hint?: string
}) {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-end overflow-hidden"
      style={{
        padding: compact ? '10%' : '5%',
        background: `linear-gradient(145deg, ${project.ink} 0%, ${project.ink} 50%, ${project.accent}66 150%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute -right-[15%] -top-[25%] aspect-square w-[70%] rounded-full opacity-50"
        style={{
          background: `radial-gradient(closest-side, ${project.accent}, transparent)`,
        }}
      />
      <p
        className="relative font-medium uppercase"
        style={{
          color: project.paper,
          opacity: 0.6,
          fontSize: compact ? '5cqw' : '1.3cqw',
          letterSpacing: '0.18em',
        }}
      >
        {project.industry}
      </p>
      <p
        className="relative font-display font-semibold leading-[1.02] tracking-tight"
        style={{
          color: project.paper,
          fontSize: compact ? '14cqw' : '5.2cqw',
          marginTop: compact ? '4%' : '1.2%',
        }}
      >
        {project.name}
      </p>
      {hint && !compact && (
        <p
          className="relative rounded-full border border-white/15 bg-white/10 px-[1.4cqw] py-[0.6cqw] font-medium"
          style={{
            color: project.paper,
            fontSize: '1.2cqw',
            width: 'fit-content',
            marginTop: '2%',
          }}
        >
          {hint}
        </p>
      )}
    </div>
  )
}

function ScaledFrame({
  project,
  src,
  title,
  image,
  width,
  height,
  live = false,
  compact = false,
}: {
  project: Project
  src: string
  title: string
  image?: string
  width: number
  height: number
  live?: boolean
  compact?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  // forget the loaded state once the iframe is removed
  useEffect(() => {
    if (!live) setLoaded(false)
  }, [live])

  const showIframe = !image && live && scale > 0

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{
        // with a screenshot the frame takes the image's own height (no empty space);
        // without one it keeps a fixed ratio for the placeholder / live preview
        ...(image ? {} : { aspectRatio: `${width} / ${height}` }),
        containerType: 'inline-size',
        background: project.ink,
      }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full select-none"
          draggable={false}
        />
      ) : (
        <Placeholder
          project={project}
          compact={compact}
          hint={live ? 'Loading live preview…' : 'Hover for live preview'}
        />
      )}

      {showIframe && (
        <iframe
          src={src}
          title={title}
          tabIndex={-1}
          aria-hidden="true"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={`pointer-events-none absolute left-0 top-0 border-0 transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
        />
      )}
    </div>
  )
}

export function ProjectStage({
  project,
  priority = false,
}: {
  project: Project
  priority?: boolean
}) {
  const host = new URL(project.liveUrl).host
  const [live, setLive] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  // small delay so scrolling the mouse past a preview doesn't start loading a site
  const start = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setLive(true), 350)
  }
  const stop = () => {
    window.clearTimeout(timer.current)
    setLive(false)
  }

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const desktopImage = project.previewImage || undefined
  // no fallback to the desktop shot: a desktop screenshot squeezed into a phone looks wrong
  const mobileImage =
    (project as Project & { previewImageMobile?: string }).previewImageMobile ||
    undefined

  return (
    <div
      className="relative"
      aria-hidden={priority ? undefined : true}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <BrowserChrome url={host} className="relative z-10">
        <ScaledFrame
          project={project}
          src={project.liveUrl}
          title={`${project.name} website`}
          image={desktopImage}
          width={1280}
          height={800}
          live={live}
        />
      </BrowserChrome>
      <PhoneChrome className="absolute -right-3 bottom-[-8%] z-20 w-[28%] min-w-16 sm:-right-6 sm:w-[30%]">
        {/* the phone frame never runs a live site: half the load, same look */}
        <ScaledFrame
          project={project}
          src={project.liveUrl}
          title={`${project.name} mobile website`}
          image={mobileImage}
          width={390}
          height={844}
          compact
        />
      </PhoneChrome>
    </div>
  )
}