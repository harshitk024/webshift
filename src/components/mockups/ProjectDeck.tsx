import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Premium 3D glass project deck.
 * Self-contained: no images needed, every card is drawn with gradients + glass shapes.
 * Each slide can have an `image`; if it is missing or fails to load, the gradient artwork is shown instead.
 */

type Slide = {
  title: string;
  category: string;
  caption: string;
  // three gradient stops for the card artwork
  colors: [string, string, string];
  // photo shown on the card (path in /public or a full URL). Falls back to the gradient if missing/broken.
  image?: string;
};

const SLIDES: Slide[] = [
  {
    title: "Web Design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Websites",
    caption: "Fast, modern sites that turn visitors into customers.",
    colors: ["#7c3aed", "#ec4899", "#f59e0b"],
  },
  {
    title: "Video Editing",
    image: "https://images.unsplash.com/photo-1780642213026-cf15a7676c6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Editing",
    caption: "Reels, promos and long-form cut to hold attention.",
    colors: ["#4f46e5", "#d946ef", "#fb7185"],
  },
  {
    title: "Media Handling",
    image: "https://images.unsplash.com/photo-1724862936518-ae7fcfc052c1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Social",
    caption: "Consistent content across every channel you run.",
    colors: ["#2563eb", "#8b5cf6", "#ec4899"],
  },
  {
    title: "SEO Specialist",
    image: "https://images.unsplash.com/photo-1771054243991-e7b2d194ac96?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Growth",
    caption: "Get found by the people already searching for you.",
    colors: ["#0891b2", "#6366f1", "#c026d3"],
  },
  {
    title: "Website Testing",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    category: "Quality",
    caption: "Every page, device and form checked before launch.",
    colors: ["#9333ea", "#f43f5e", "#fb923c"],
  },
];

const N = SLIDES.length;
const HALF = Math.floor(N / 2);

function CardArt({ colors, image }: { colors: Slide["colors"]; image?: string }) {
  const [a, b, c] = colors;
  const [failed, setFailed] = useState(false);
  const showImage = !!image && !failed;

  return (
    <div
      className="absolute inset-0"
      style={{
        background: `linear-gradient(155deg, ${a} 0%, ${b} 58%, ${c} 120%)`,
      }}
    >
      {showImage ? (
        <>
          <img
            src={image}
            alt=""
            draggable={false}
            loading="eager"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full select-none object-cover"
          />
          {/* colour tint so photos match the purple/pink scheme */}
          <div
            className="absolute inset-0 mix-blend-soft-light"
            style={{
              background: `linear-gradient(155deg, ${a} 0%, ${b} 60%, ${c} 130%)`,
              opacity: 0.5,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(155deg, ${a}40 0%, transparent 50%)`,
            }}
          />
        </>
      ) : (
        <>
          {/* soft colour blobs (gradient fallback) */}
          <div
            className="absolute -left-10 top-6 h-44 w-44 rounded-full opacity-80 blur-2xl"
            style={{ background: `radial-gradient(circle, ${c}, transparent 70%)` }}
          />
          <div
            className="absolute -right-12 top-24 h-52 w-52 rounded-full opacity-70 blur-2xl"
            style={{ background: `radial-gradient(circle, ${b}, transparent 70%)` }}
          />
          <div
            className="absolute -bottom-16 left-4 h-56 w-72 rounded-[50%] opacity-90 blur-xl"
            style={{ background: `linear-gradient(120deg, ${a}, #1e1b4b)` }}
          />
        </>
      )}

      {/* readability gradient for the text at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/90 via-black/55 to-transparent" />
    </div>
  );
}

export default function ProjectDeck() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % N), []);
  const prev = useCallback(() => setActive((i) => (i - 1 + N) % N), []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(next, 3200);
    return () => window.clearInterval(id);
  }, [paused, reduceMotion, next]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Our services"
    >
      {/* Stage */}
      <div className="relative h-[440px] sm:h-[470px]">
        {/* Soft glow behind the cards (no box/panel) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* glow behind cards, one per slide, cross-faded */}
        {SLIDES.map((s, i) => (
          <motion.div
            key={s.title}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
            style={{ background: s.colors[1] }}
            animate={{ opacity: i === active ? 0.28 : 0 }}
            transition={{ duration: 0.8 }}
          />
        ))}

        </div>

        {/* Cards */}
        <div className="absolute inset-0 z-10 pb-12">
          {SLIDES.map((s, i) => {
            const offset = ((i - active + N + HALF) % N) - HALF; // -2..2
            const abs = Math.abs(offset);
            const isActive = offset === 0;

            return (
              <motion.button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${s.title}`}
                aria-current={isActive}
                className="absolute left-1/2 top-1/2 -ml-[125px] -mt-[165px] h-[330px] w-[250px] cursor-pointer rounded-[32px] text-left outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                style={{
                  transformPerspective: 1100,
                  pointerEvents: abs > 1 ? "none" : "auto",
                }}
                initial={false}
                animate={{
                  x: offset * 168,
                  y: isActive ? -6 : abs * 4,
                  scale: isActive ? 1.04 : 1 - abs * 0.14,
                  rotateY: offset * -30,
                  rotateZ: isActive ? 0 : offset * 1.5,
                  opacity: abs > 1 ? 0 : isActive ? 1 : 0.85,
                  zIndex: 10 - abs,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 140, damping: 20, mass: 0.9 }
                }
                whileHover={isActive ? { scale: 1.07 } : undefined}
              >
                {/* Inner wrapper does the rounding/clipping so the 3D tilt can't square off the corners */}
                <div className="absolute inset-0 transform-gpu overflow-hidden rounded-[32px] [clip-path:inset(0_round_32px)]">
                <CardArt colors={s.colors} image={s.image} />

                {/* glass frame */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-[32px] border transition-colors duration-500 ${
                    isActive ? "border-white/50" : "border-white/15"
                  }`}
                />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/30 to-transparent" />

                {/* top row */}
                <div className="absolute inset-x-4 top-4 flex items-center justify-between">
                  <span className="text-[10px] font-semibold tracking-[0.18em] text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
                    WEBSHIFT®
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/35 px-2.5 py-1 text-[10px] font-medium text-white">
                    {s.category}
                  </span>
                </div>

                {/* bottom copy */}
                <div className="absolute inset-x-5 bottom-5">
                  <h3 className="font-display text-[26px] font-semibold leading-[1.05] tracking-[-0.03em] text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.6)]">
                    {s.title}
                  </h3>
                  <p
                    className={`mt-2 text-xs leading-5 text-white/85 [text-shadow:0_1px_8px_rgba(0,0,0,0.7)] transition-all duration-500 ${
                      isActive ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {s.caption}
                  </p>
                </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="absolute inset-x-0 bottom-4 z-20 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-sm text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70"
          >
            ←
          </button>

          <div className="flex items-center gap-1.5">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to ${s.title}`}
                className="py-2"
              >
                <span
                  className="block h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === active ? 22 : 6,
                    background:
                      i === active
                        ? `linear-gradient(90deg, ${s.colors[0]}, ${s.colors[2]})`
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-sm text-white/70 backdrop-blur-md transition hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-white/70"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}