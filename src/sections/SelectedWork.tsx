import { ArrowUpRight } from "lucide-react";
import { ProjectStage } from "../components/mockups/ProjectMockup";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";

export function SelectedWork() {
  const gradientText = 'bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-400 bg-clip-text text-transparent'

  return (
    <section id="work" className="relative isolate overflow-hidden">
      {/* ───────── BACKGROUND: continues the hero's mesh ───────── */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Radial gradients (cheap) instead of large blur filters (expensive on scroll) */}
        <div className="absolute -left-40 -top-[120px] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(14,165,233,0.14),transparent)]" />
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(70%_100%_at_70%_0%,rgba(79,70,229,0.14),transparent_70%)]" />
        <div className="absolute -right-48 top-[30%] h-[700px] w-[700px] bg-[radial-gradient(closest-side,rgba(79,70,229,0.16),transparent)]" />
        <div className="absolute -left-48 top-[62%] h-[640px] w-[640px] bg-[radial-gradient(closest-side,rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute -bottom-24 -right-40 h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(14,165,233,0.10),transparent)]" />
        {/* same fine grid as the hero */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_25%,transparent_75%,black)] opacity-70" />
      </div>

      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          {/* Eyebrow: same glass pill as the hero */}
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-foam/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
            Selected work
          </p>

          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-5xl font-semibold leading-[0.95] tracking-[-0.045em] text-foam md:text-6xl">
              Work that speaks for{" "}
              <span className={gradientText}>itself.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-foam/60">
              Concept studies for the kinds of businesses Webshift is built to
              help. Not commissioned client work.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <article className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative block lg:col-span-7 ${
                    index % 2 === 1 ? "lg:order-2" : ""
                  }`}
                  aria-label={`Visit ${project.name} live website`}
                >
                  {/* gradient glow behind the mockup */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgba(99,102,241,0.30),transparent)] opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="rounded-2xl ring-1 ring-white/10">
                    <ProjectStage project={project} priority={index === 0} />
                  </div>
                </a>

                <div
                  className={`lg:col-span-5 ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <p className="font-display text-sm">
                    <span className={gradientText}>{project.index}</span>{" "}
                    <span className="text-foam/40">
                      / {String(projects.length).padStart(2, "0")}
                    </span>
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-semibold leading-none tracking-tight text-foam md:text-5xl">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:text-violet-300"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-4 text-[12px] uppercase tracking-[0.16em] text-foam/50">
                    {project.industry} · {project.type}
                  </p>
                  <p className="mt-4 max-w-md text-base text-foam/75">
                    {project.summary}
                  </p>
                  <p className="mt-3 text-sm text-foam/50">
                    Focus: {project.focus}
                  </p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-sm text-foam shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition hover:border-violet-400/50 hover:bg-white/10"
                  >
                    Visit live site
                    <ArrowUpRight
                      size={16}
                      aria-hidden="true"
                      className="text-violet-300 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                    />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}