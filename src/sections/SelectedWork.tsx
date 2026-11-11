import { ArrowUpRight } from "lucide-react";
import { ProjectStage } from "../components/mockups/ProjectMockup";
import { Reveal } from "../components/Reveal";
import { projects } from "../data/projects";

export function SelectedWork({ compact = false }: { compact?: boolean }) {

  return (
    <section id="work" className="bg-graphite">
      <div className="mx-auto max-w-[1280px] px-6 py-20 md:px-10 md:py-28 lg:px-16">
        <Reveal>
          <p className="text-[12px] tracking-[0.18em] text-lime uppercase">
            Selected work
          </p>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-xl font-display text-5xl leading-[0.95] font-semibold tracking-[-0.04em] text-foam md:text-6xl">
              Work that speaks for itself.
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-mist">
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
                  className={`group block lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  aria-label={`Visit ${project.name} live website`}
                >
                  <div className="origin-center transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                    <ProjectStage project={project} priority />
                  </div>
                </a>

                <div
                  className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <p className="font-display text-sm text-lime">
                    {project.index}{" "}
                    <span className="text-mist">
                      / {String(projects.length).padStart(2, "0")}
                    </span>
                  </p>
                  <h3 className="mt-3 font-display text-4xl leading-none font-semibold tracking-tight text-foam md:text-5xl">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-lime"
                    >
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-4 text-[12px] tracking-[0.16em] text-mist uppercase">
                    {project.industry} · {project.type}
                  </p>
                  <p className="mt-4 max-w-md text-base text-foam/80">
                    {project.summary}
                  </p>
                  <p className="mt-3 text-sm text-mist">
                    Focus: {project.focus}
                  </p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-lime"
                  >
                    Visit live site
                    <ArrowUpRight size={16} aria-hidden="true" />
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
