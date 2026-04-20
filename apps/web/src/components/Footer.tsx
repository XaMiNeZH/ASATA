import { Link } from 'react-router-dom'
import { LOGO } from '../data/images'

const navLinks = [
  { to: '/',        label: 'Accueil' },
  { to: '/about',   label: 'À Propos' },
  { to: '/equipe',  label: 'Notre Équipe' },
  { to: '/galerie', label: 'Galerie' },
  { to: '/contact', label: 'Contact' },
  { to: '/don',     label: 'Faire un Don' },
]

const clubLinks = [
  { to: '/ski',        label: 'Ski & Montagne' },
  { to: '/football',   label: 'Football' },
  { to: '/athletisme', label: 'Athlétisme' },
]

const feds = [
  { label: 'FRMSSM — Ski & Montagne', href: 'http://frmssm.ma/' },
  { label: 'FRMF — Football',         href: 'https://frmf.ma/fr' },
  { label: 'FRMA — Athlétisme',       href: 'https://frma.ma/' },
]

export default function Footer() {
  return (
    <footer className="bg-footer text-white/70">
      <div className="max-w-7xl mx-auto px-5 pt-16 pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={LOGO}
                alt="Logo ASATA"
                className="w-14 h-14 rounded-full object-contain border-2 border-white/20"
              />
              <div>
                <p className="font-heading font-extrabold text-xl text-white tracking-wide">ASATA</p>
                <p className="text-[11px] text-white/50 tracking-wide">Atlas Toubkal Asni</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 text-white/55">
              Association Sportive fondée en 2010 à Asni, au pied du Djebel Toubkal. Sport, jeunesse et valeurs humaines.
            </p>
            <ul className="flex flex-col gap-2 text-sm">
              {[
                { icon: 'fas fa-envelope',       text: 'asata.club@gmail.com' },
                { icon: 'fas fa-map-marker-alt', text: 'Asni, Province d\'Al Haouz, Maroc' },
                { icon: 'fas fa-mountain',        text: 'Altitude 1 150 m · 50 km de Marrakech' },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-start gap-2 text-white/55">
                  <i className={`${icon} text-primary-light mt-0.5 w-4 shrink-0`} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[2px] text-white mb-5 pb-3 border-b border-white/10">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2">
              {navLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-white/55 hover:text-primary-light transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Clubs */}
          <div>
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[2px] text-white mb-5 pb-3 border-b border-white/10">
              Nos Clubs
            </h4>
            <ul className="flex flex-col gap-2">
              {clubLinks.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-sm text-white/55 hover:text-primary-light transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Federations */}
          <div>
            <h4 className="font-heading font-bold text-[11px] uppercase tracking-[2px] text-white mb-5 pb-3 border-b border-white/10">
              Fédérations
            </h4>
            <ul className="flex flex-col gap-2">
              {feds.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/55 hover:text-primary-light transition-colors flex items-center gap-1 group"
                  >
                    <span className="text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.08] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © 2026 ASATA — Association Sportive Atlas Toubkal Asni. Tous droits réservés.
          </p>
          <div className="flex gap-2">
            {[
              { href: 'https://www.facebook.com/asataclub', icon: 'fab fa-facebook-f' },
            ].map(({ href, icon }) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/50 hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 text-sm"
              >
                <i className={icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
