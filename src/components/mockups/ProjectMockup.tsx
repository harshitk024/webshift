import type { Project } from '../../data/projects'
import { BrowserChrome, PhoneChrome } from './BrowserChrome'
import { useEffect, useRef, useState } from 'react'
// keep your existing BrowserChrome / PhoneChrome imports

function ScaledFrame({
  src,
  title,
  image,
  width,
  height,
}: {
  src: string
  title: string
  image?: string
  width: number
  height: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / width)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden bg-white"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
      ) : (
        scale > 0 && (
          <iframe
            src={src}
            title={title}
            loading="lazy"
            tabIndex={-1}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-0 border-0"
            style={{
              width,
              height,
              transform: `scale(${scale})`,
              transformOrigin: 'top left',
            }}
          />
        )
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

  return (
    <div className="relative" aria-hidden={priority ? undefined : true}>
      <BrowserChrome url={host} className="relative z-10">
        <ScaledFrame
          src={project.liveUrl}
          title={`${project.name} website`}
          image={project.previewImage}
          width={1280}
          height={800}
        />
      </BrowserChrome>
      <PhoneChrome className="absolute -right-3 bottom-[-8%] z-20 w-[28%] min-w-16 sm:-right-6 sm:w-[30%]">
        <ScaledFrame
          src={project.liveUrl}
          title={`${project.name} mobile website`}
          image={project.previewImage}
          width={390}
          height={844}
        />
      </PhoneChrome>
    </div>
  )
}