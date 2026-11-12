import { Link } from 'react-router-dom'
import { mailtoHref, site, whatsappHref } from '../config/site'
import { services } from '../data/services'
import logo from "../assets/webshift.png"

export function Footer() {
  const year = new Date().getFullYear()
  const socials = site.socials.filter((item) => item.href)

  return (
    <footer className="border-t border-ink-line bg-graphite text-foam">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-6 py-16 md:grid-cols-12 md:px-10 lg:px-16">
        <div className="md:col-span-4">
          <p className="font-display text-2xl font-semibold tracking-tight">
            <img
            src={logo}
            alt={site.wordmark}
            className="h-8 w-auto md:h-16"
          />
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">{site.tagline}</p>
          <p className="mt-6 text-sm text-mist">{site.contact.location}</p>
        </div>

        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.16em] text-mist uppercase">Navigate</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              ['/', 'Home'],
              ['/work', 'Work'],
              ['/services', 'Services'],
              ['/about', 'About'],
              ['/contact', 'Contact'],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="text-foam/90 hover:text-lime">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.16em] text-mist uppercase">Services</p>
          <ul className="mt-4 space-y-2 text-sm text-foam/90">
            {services.slice(0, 5).map((service) => (
              <li key={service.index}>
                <Link to="/services" className="hover:text-lime">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.16em] text-mist uppercase">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={mailtoHref()} className="hover:text-lime">
                {site.contact.email}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} className="hover:text-lime">
                WhatsApp {site.contact.whatsappDisplay}
              </a>
            </li>
            {socials.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-lime">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-line">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-6 py-5 text-xs text-mist sm:flex-row sm:justify-between md:px-10 lg:px-16">
          <p>
            © {year} {site.name}. Independently operated.
          </p>
          <p>Web design & development for local businesses.</p>
        </div>
      </div>
    </footer>
  )
}
