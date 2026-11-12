import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { site } from '../config/site'
import { MagneticButton } from './MagneticButton'
import logo from "../assets/webshift.png"

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Work' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  // On the home page, the bar is fully transparent at the top so it reads as part of the hero
  const seamless = isHome && !scrolled && !open

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // slightly more solid once the page scrolls, so content never clashes with the links
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-[backdrop-filter] duration-300 ${
        isHome ? '-mb-16' : ''
      } ${seamless ? '' : 'backdrop-blur-xl'}`}
    >
      {/* Background layers only appear once the bar needs to separate from content */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-300 ${
          seamless ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="absolute inset-0 bg-graphite/80" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_140%_at_85%_0%,rgba(124,58,237,0.28),transparent_70%),radial-gradient(40%_120%_at_0%_100%,rgba(56,189,248,0.10),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-fuchsia-400/30" />
      </div>

      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 md:px-10 lg:px-16">
        <Link to="/" className="font-display text-lg font-semibold tracking-tight text-foam">
          <img
            src={logo}
            alt={site.wordmark}
            className="h-8 w-auto md:h-14"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `relative text-sm text-foam/60 transition-colors hover:text-foam ${
                  isActive ? '!text-foam' : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-gradient-to-r from-sky-300 via-violet-400 to-fuchsia-400 transition-all ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton
            to="/contact"
            className="inline-flex w-fit bg-brand-gradient px-5 py-3 text-sm font-medium text-graphite shadow-[0_8px_30px_-8px_rgba(139,92,246,0.7)]"
          >
            Start a project
          </MagneticButton>
        </div>

        <button
          type="button"
          className="inline-flex size-10 items-center justify-center text-foam lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-graphite/95 bg-[radial-gradient(80%_60%_at_100%_0%,rgba(124,58,237,0.25),transparent_70%)] backdrop-blur-xl lg:hidden"
        >
          <nav className="flex flex-col px-6 py-6" aria-label="Mobile">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className="border-b border-white/10 py-4 font-display text-3xl text-foam"
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="mt-6 inline-flex w-fit bg-brand-gradient px-5 py-3 text-sm font-medium text-graphite"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}