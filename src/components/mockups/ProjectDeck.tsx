


"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
  type MotionValue,
} from "motion/react";

interface Slide {
  image: string;
  title: string;
  description: string;
  badge: string;
}

const slides: Slide[] = [
  {
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "website design",
    description: "Scale new heights and embrace the hiker's journey.",
    badge: "web",
  },
  {
    image: "https://images.unsplash.com/photo-1771054243991-e7b2d194ac96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "seo",
    description: "Feel the adrenaline rush as you navigate the wild rapids.",
    badge: "web",
  },
  {
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "site tester",
    description: "Deep dive into the silence of the ancient woods.",
    badge: "quality",
  },
  {
    image: "https://images.unsplash.com/photo-1780642213026-cf15a7676c6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "video editor",
    description: "Unwind on the crystal clear shores of a tropical paradise.",
    badge: "editing",
  },
  {
    image: "https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    title: "media handler",
    description: "Discover inner peace through ancient wisdom.",
    badge: "visibility",
  },
];

interface CarouselConfig {
  distanceDivisor: number;
  velocityDivisor: number;
  sensitivity: number;
  xMultiplier: number;
  yMultiplier: number;
  rotationMultiplier: number;
  scaleReduction: number;
}

const getCarouselConfig = (width: number): CarouselConfig => {
  if (width < 640) {
    return {
      distanceDivisor: 120,
      velocityDivisor: 500,
      sensitivity: 180,
      xMultiplier: 90,
      yMultiplier: 20,
      rotationMultiplier: 8,
      scaleReduction: 0.06,
    };
  }

  if (width < 1024) {
    return {
      distanceDivisor: 160,
      velocityDivisor: 650,
      sensitivity: 220,
      xMultiplier: 130,
      yMultiplier: 30,
      rotationMultiplier: 10,
      scaleReduction: 0.09,
    };
  }

  return {
    distanceDivisor: 200,
    velocityDivisor: 800,
    sensitivity: 250,
    xMultiplier: 170,
    yMultiplier: 40,
    rotationMultiplier: 12,
    scaleReduction: 0.12,
  };
};

export function ProjectDeck() {
  const scrollProgress = useMotionValue(0);
  const startProgress = React.useRef(0);

  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  const total = slides.length;

  // Responsive configuration
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const config = React.useMemo(
    () => getCarouselConfig(windowWidth),
    [windowWidth]
  );

  // AUTOMATIC CAROUSEL MOVEMENT
  React.useEffect(() => {
    if (isDragging) return;

    const interval = window.setInterval(() => {
      const nextPosition = Math.round(scrollProgress.get()) + 1;

      animate(scrollProgress, nextPosition, {
        type: "spring",
        stiffness: 120,
        damping: 24,
        mass: 0.8,
      });
    }, 2500);

    return () => window.clearInterval(interval);
  }, [isDragging, scrollProgress]);

  // Drag handlers
  const handleDragStart = () => {
    setIsDragging(true);
    startProgress.current = scrollProgress.get();
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    const distanceShift = -dragDistance / config.distanceDivisor;
    const velocityShift = -velocity / config.velocityDivisor;

    let totalShift = Math.round(distanceShift + velocityShift);

    totalShift = Math.max(-3, Math.min(3, totalShift));

    const target = Math.round(startProgress.current) + totalShift;

    animate(scrollProgress, target, {
      type: "spring",
      stiffness: 200,
      damping: 30,
      mass: 1,
      onComplete: () => setIsDragging(false),
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden py-10 select-none">
      <div className="relative flex h-80 w-full max-w-7xl items-center justify-center sm:h-[28rem] lg:h-[32rem]">

        {/* DRAG SURFACE */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragStart={handleDragStart}
          onDrag={(_, info) => {
            const delta = -info.delta.x / config.sensitivity;

            scrollProgress.set(scrollProgress.get() + delta);
          }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-50 cursor-grab active:cursor-grabbing"
        />

        {/* CARDS */}
        {slides.map((slide, i) => (
          <ProjectCard
            key={i}
            slide={slide}
            index={i}
            total={total}
            progress={scrollProgress}
            config={config}
          />
        ))}
      </div>
    </div>
  );
}

// CARD PROPS
interface ProjectCardProps {
  slide: Slide;
  index: number;
  total: number;
  progress: MotionValue<number>;
  config: CarouselConfig;
}

// INDIVIDUAL CARD
function ProjectCard({
  slide,
  index,
  total,
  progress,
  config,
}: ProjectCardProps) {
  const offset = useTransform(progress, (p) => {
    let diff = (index - p) % total;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    return diff;
  });

  const x = useTransform(
    offset,
    (o) => o * config.xMultiplier
  );

  const rotate = useTransform(offset, (o) => {
    if (Math.abs(o) < 0.05) return 0;

    return o * config.rotationMultiplier;
  });

  const y = useTransform(offset, (o) => {
    if (Math.abs(o) < 0.05) return 0;

    return Math.abs(o) * config.yMultiplier;
  });

  const scale = useTransform(
    offset,
    (o) => 1 - Math.abs(o) * config.scaleReduction
  );

  const opacity = useTransform(
    offset,
    [-total / 2, -total / 2 + 0.5, 0, total / 2 - 0.5, total / 2],
    [0, 1, 1, 1, 0]
  );

  const zIndex = useTransform(
    offset,
    (o) => Math.round(100 - Math.abs(o) * 10)
  );

  const overlayOpacity = useTransform(
    offset,
    [-2, -0.5, 0, 0.5, 2],
    [0.5, 0.2, 0, 0.2, 0.5]
  );

  const contentOpacity = useTransform(
    offset,
    [-0.5, 0, 0.5],
    [0, 1, 0]
  );

  return (
    <motion.div
      style={{
        x,
        rotate,
        y,
        scale,
        opacity,
        zIndex,
      }}
      className="pointer-events-none group absolute h-56 w-44 overflow-hidden rounded-2xl bg-neutral-800 sm:h-80 sm:w-56 lg:h-96 lg:w-64"
    >
      {/* IMAGE */}
      <img
        src={slide.image}
        alt={slide.title}
        draggable={false}
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* OVERLAY */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="pointer-events-none absolute inset-0 bg-black"
      />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* BADGE */}
      <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/95 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-black sm:right-5 sm:top-5 sm:px-3 sm:text-xs">
        {slide.badge}
      </div>

      {/* TEXT */}
      <div className="absolute bottom-5 left-3 right-3 text-center text-white sm:bottom-8 sm:left-5 sm:right-5 sm:text-left lg:bottom-10 lg:left-6 lg:right-6">
        <motion.p
          style={{ opacity: contentOpacity }}
          className="mb-1 text-sm font-bold leading-tight drop-shadow-md sm:text-lg lg:text-xl"
        >
          {slide.title}
        </motion.p>

        <motion.p
          style={{ opacity: contentOpacity }}
          className="hidden line-clamp-2 text-xs font-medium italic text-white/70 sm:block"
        >
          {slide.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default ProjectDeck;
