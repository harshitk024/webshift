import { TextRotate } from "../components/text-rotate";
import ProjectDeck from "../components/mockups/ProjectDeck";
import { MagneticButton } from "../components/MagneticButton";

import { motion } from "motion/react";

export function Hero() {
  const roles = [
    "Web Designer",
    "Video Editor",
    "Media Handler",
    "SEO Specialist",
    "Website Tester",
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* ───────── BACKGROUND: gradient mesh + grid ───────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* base wash */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,rgba(79,70,229,0.18),transparent_55%),radial-gradient(90%_70%_at_0%_100%,rgba(37,99,235,0.18),transparent_60%)]" />

        {/* glow orbs */}
        <div className="absolute -right-32 -top-32 h-[560px] w-[560px] rounded-full bg-indigo-600/18 blur-[140px]" />
        <div className="absolute right-[18%] top-[45%] h-[360px] w-[360px] rounded-full bg-violet-500/10 blur-[130px]" />
        <div className="absolute -left-40 bottom-[-120px] h-[460px] w-[460px] rounded-full bg-sky-500/15 blur-[140px]" />

        {/* fine grid, faded at the edges */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />

      </div>

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-6 pb-16 pt-32 md:px-10 md:pb-20 md:pt-36 lg:grid-cols-12 lg:px-16 lg:pb-24 lg:pt-40">
        {/* ───────── LEFT CONTENT ───────── */}
        <div className="lg:col-span-7">
          {/* Eyebrow: glass pill */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-foam/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
            </span>
            Independent Digital Creative Studio
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-[11vw] font-semibold leading-[0.98] tracking-[-0.055em] text-foam sm:text-6xl lg:text-[78px] xl:text-[84px]"
          >
            <span className="block">Your business</span>

            <span className="block">deserves a better</span>

            {/* AUTOMATIC VERTICAL TEXT ROTATOR */}
            <TextRotate
              texts={roles}
              mainClassName="mt-2 min-h-[1.2em] overflow-hidden bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent"
              splitLevelClassName="overflow-hidden pb-[0.08em]"
              elementLevelClassName="inline-block"
              splitBy="words"
              staggerFrom="first"
              staggerDuration={0.025}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              animatePresenceMode="wait"
              rotationInterval={1800}
              transition={{
                type: "tween",
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-8 max-w-xl text-base leading-8 text-foam/65 md:text-lg"
          >
            We design, create and manage digital experiences that help
            businesses build credibility, connect with customers and create
            better opportunities online.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton to="/work">Explore our work</MagneticButton>

            <MagneticButton to="/contact" variant="ghost">
              Let's discuss your project
            </MagneticButton>
          </motion.div>
        </div>

        {/* ───────── RIGHT: PROJECT DECK ───────── */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative lg:col-span-5 lg:left-6 xl:left-12"
        >
          <ProjectDeck />
        </motion.div>
      </div>

      {/* BOTTOM INDICATOR */}
      <div className="relative mx-auto flex max-w-[1280px] items-center justify-between px-6 pb-8 text-[10px] uppercase tracking-[0.2em] text-foam/35 md:px-10 lg:px-16">
        <span>Scroll to explore</span>
        <span>Mathura · India</span>
      </div>
    </section>
  );
}