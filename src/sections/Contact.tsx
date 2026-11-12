import { ContactForm } from "../components/ContactForm";
import InteractiveEarth from "../components/InteractiveEarth";
import { site, whatsappHref } from "../config/site";

export function Contact({ headline = true }: { headline?: boolean }) {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-graphite text-foam"
    >
      {/* Background: same gradient + grid language as the rest of the site */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[620px] w-[620px] bg-[radial-gradient(closest-side,rgba(79,70,229,0.16),transparent)]" />
        <div className="absolute -left-48 top-[35%] h-[560px] w-[560px] bg-[radial-gradient(closest-side,rgba(14,165,233,0.10),transparent)]" />
        <div className="absolute -bottom-48 -right-32 h-[520px] w-[520px] bg-[radial-gradient(closest-side,rgba(139,92,246,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_50%_45%,black,transparent)]" />
      </div>

      {/* Header */}
      {headline && (
        <div className="relative z-10 mx-auto max-w-3xl px-6 pt-20 text-center md:pt-24">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-foam/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-violet-500" />
            Let's talk
          </p>

          <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
            Contact us
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-foam/60 md:text-lg">
            Have a project in mind? We'd love to hear about it.
            Tell us what you're building and let's make it happen.
          </p>
        </div>
      )}

      {/* Main Contact Area */}
      <div className="relative mx-auto grid max-w-[1280px] gap-14 px-6 pb-20 pt-16 md:px-10 md:pb-28 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:pb-36">

        {/* LEFT COLUMN */}
        <div className="relative lg:col-span-5 lg:min-h-[720px]">

          {/* Contact Information */}
          <div className="relative z-10">
            <h3 className="font-display text-2xl font-semibold">
              Get in touch
            </h3>

            <p className="mt-3 max-w-sm text-base leading-7 text-foam/60">
              Reach out through any channel below. Tell us about your
              business, your ideas, or the problem you're trying to solve.
            </p>

            <div className="mt-9 space-y-6">

              {/* Email */}
              <a
                href={`mailto:${site.contact.email}`}
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-all duration-300 group-hover:border-lime group-hover:bg-lime/10 group-hover:text-lime">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>

                <span className="break-all text-sm text-foam/65 transition-colors group-hover:text-lime">
                  {site.contact.email}
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href={whatsappHref()}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] transition-all duration-300 group-hover:border-lime group-hover:bg-lime/10 group-hover:text-lime">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5Z" />
                    <path d="M9 9c.5 2 2 3.5 4 4l1-1 2 1-.5 2c-4 .5-8-3.5-7.5-7.5l2-.5 1 2Z" />
                  </svg>
                </span>

                <span className="text-sm text-foam/65 transition-colors group-hover:text-lime">
                  WhatsApp · {site.contact.whatsappDisplay}
                </span>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                </span>

                <span className="text-sm text-foam/65">
                  {site.contact.location}
                </span>
              </div>
            </div>
          </div>

          {/* 3D Rotating Earth
              - below lg: sits in normal flow, centred, sized to the screen
              - lg and up: the original overlapping position beside the form */}
          <div className="pointer-events-auto relative z-0 mx-auto mt-16 aspect-square w-full max-w-[320px] sm:max-w-[400px] lg:absolute lg:left-[-100px] lg:top-[340px] lg:mx-0 lg:mt-0 lg:h-[540px] lg:w-[540px] lg:max-w-none">
            <InteractiveEarth />
          </div>
        </div>

        {/* RIGHT COLUMN - CONTACT FORM */}
        <div className="relative z-10 lg:col-span-7">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_80px_-30px_rgba(49,46,129,0.6)] backdrop-blur-md md:p-10">

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-lime">
                Contact form
              </p>

              <h3 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
                Send us a message
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-foam/60">
                Tell us a little about your project. We'll get back
                to you as soon as possible.
              </p>
            </div>

            <div className="my-8 border-t border-dashed border-white/15" />

            {/* Existing form and submission logic */}
            <ContactForm />

          </div>

          <p className="mt-5 text-center text-xs text-foam/50">
            Your information stays private. We don't share your details.
          </p>
        </div>
      </div>
    </section>
  );
}