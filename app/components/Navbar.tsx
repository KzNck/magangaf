'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

type DropdownItem = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
};

const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
  {
    label: 'Kursus',
    href: '/kursus',
  },
  {
    label: 'Sertifikasi',
    href: '/sertifikasi',
  },
  {
    label: 'Acara',
    href: '/acara',
  },
  { label: 'Perpustakaan', href: '/perpustakaan' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Sembunyikan Navbar di halaman admin
  if (pathname.startsWith('/admin')) return null;

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileAccordion(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function handleMouseEnter(label: string) {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  }

  function handleMouseLeave() {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  }

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <>
      {/* Tricolore top line */}
      <div className="tricolore-line-thin" style={{ position: 'sticky', top: 0, zIndex: 60 }} />

      <nav
        className="sticky z-50 transition-all duration-300"
        style={{
          top: '2px',
          background: scrolled ? 'rgba(255,255,255,0.97)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: scrolled ? '1px solid rgba(13,27,62,0.08)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 20px rgba(13,27,62,0.06)' : 'none',
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          {/* ====== LOGO ====== */}
          <Link href="/" className="group flex items-center gap-3">
            <span
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, var(--af-navy) 0%, var(--af-crimson) 100%)',
                boxShadow: '0 4px 15px rgba(13,27,62,0.2)',
              }}
            >
              AF
            </span>
            <div>
              <p className="text-sm font-bold md:text-base" style={{ color: 'var(--af-navy)' }}>
                Alliance Française
              </p>
              <p className="text-[11px] tracking-wide" style={{ color: 'var(--af-gray-400)' }}>
                Semarang
              </p>
            </div>
          </Link>

          {/* ====== DESKTOP NAV ====== */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
                onMouseLeave={() => item.dropdown && handleMouseLeave()}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive(item.href) ? 'var(--af-crimson)' : 'var(--af-gray-500)',
                    background: isActive(item.href) ? 'rgba(196,30,58,0.06)' : 'transparent',
                  }}
                  onMouseOver={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color = 'var(--af-navy)';
                      e.currentTarget.style.background = 'rgba(13,27,62,0.04)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.color = 'var(--af-gray-500)';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {item.label}
                  {item.dropdown && (
                    <svg
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      className="transition-transform duration-200"
                      style={{ transform: openDropdown === item.label ? 'rotate(180deg)' : 'rotate(0)' }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.dropdown && openDropdown === item.label && (
                  <div
                    className="absolute left-0 top-full pt-2 animate-fade-in"
                    style={{ minWidth: '220px', zIndex: 70 }}
                  >
                    <div
                      className="rounded-xl border py-2 shadow-xl"
                      style={{
                        background: 'white',
                        borderColor: 'var(--af-gray-100)',
                        boxShadow: '0 15px 40px rgba(13,27,62,0.12)',
                      }}
                    >
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          className="block px-4 py-2.5 text-sm transition-all duration-150"
                          style={{
                            color: isActive(sub.href) ? 'var(--af-crimson)' : 'var(--af-gray-500)',
                            background: isActive(sub.href) ? 'rgba(196,30,58,0.04)' : 'transparent',
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = 'var(--af-offwhite)';
                            e.currentTarget.style.color = 'var(--af-navy)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = isActive(sub.href) ? 'rgba(196,30,58,0.04)' : 'transparent';
                            e.currentTarget.style.color = isActive(sub.href) ? 'var(--af-crimson)' : 'var(--af-gray-500)';
                          }}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* CTA Button */}
            <Link
              href="/perpustakaan/menjadi-anggota"
              className="btn-primary ml-3"
              style={{ padding: '9px 22px', fontSize: '0.82rem' }}
            >
              Jadi Anggota
            </Link>
          </div>

          {/* ====== MOBILE HAMBURGER ====== */}
          <button
            className="relative flex h-10 w-10 items-center justify-center rounded-lg lg:hidden"
            style={{ background: mobileOpen ? 'var(--af-offwhite)' : 'transparent' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={mobileOpen}
          >
            <div className="flex flex-col items-center justify-center gap-1.5">
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--af-navy)',
                  transform: mobileOpen ? 'rotate(45deg) translate(2.5px, 2.5px)' : 'none',
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--af-navy)',
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-0.5 w-5 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--af-navy)',
                  transform: mobileOpen ? 'rotate(-45deg) translate(2.5px, -2.5px)' : 'none',
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ====== MOBILE MENU OVERLAY ====== */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ top: '54px' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 animate-fade-in"
            style={{ background: 'rgba(13,27,62,0.3)', backdropFilter: 'blur(4px)' }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Menu panel */}
          <div
            className="absolute left-0 right-0 top-0 max-h-[calc(100vh-54px)] overflow-y-auto animate-fade-in-up"
            style={{
              background: 'white',
              borderBottom: '3px solid',
              borderImage: 'linear-gradient(90deg, var(--af-navy) 33%, white 33%, white 66%, var(--af-crimson) 66%) 1',
              boxShadow: '0 20px 40px rgba(13,27,62,0.15)',
            }}
          >
            <div className="px-5 py-4">
              {navItems.map((item) => (
                <div key={item.label} className="border-b" style={{ borderColor: 'var(--af-gray-100)' }}>
                  {item.dropdown ? (
                    <>
                      <button
                        className="flex w-full items-center justify-between py-3.5 text-left text-base font-medium"
                        style={{ color: 'var(--af-navy)' }}
                        onClick={() =>
                          setMobileAccordion(mobileAccordion === item.label ? null : item.label)
                        }
                      >
                        {item.label}
                        <svg
                          width="18" height="18" viewBox="0 0 24 24" fill="none"
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          className="transition-transform duration-200"
                          style={{
                            color: 'var(--af-gray-400)',
                            transform: mobileAccordion === item.label ? 'rotate(180deg)' : 'rotate(0)',
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>
                      {mobileAccordion === item.label && (
                        <div className="pb-3 pl-4 animate-fade-in">
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className="block py-2 text-sm"
                              style={{
                                color: isActive(sub.href) ? 'var(--af-crimson)' : 'var(--af-gray-400)',
                              }}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block py-3.5 text-base font-medium"
                      style={{
                        color: isActive(item.href) ? 'var(--af-crimson)' : 'var(--af-navy)',
                      }}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* CTA */}
              <div className="pt-5 pb-2">
                <Link
                  href="/perpustakaan/menjadi-anggota"
                  className="btn-primary w-full justify-center"
                >
                  Jadi Anggota
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
