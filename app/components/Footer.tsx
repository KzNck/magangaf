'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = {
  tentang: [
    { label: 'Tentang Kami', href: '/tentang-kami' },
    { label: 'Kursus', href: '/kursus' },
    { label: 'Sertifikasi', href: '/sertifikasi' },
  ],
  kegiatan: [
    { label: 'Semua Acara', href: '/acara' },
  ],
  layanan: [
    { label: 'Perpustakaan', href: '/perpustakaan' },
  ],
};

const Footer = () => {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  // Sembunyikan Footer di halaman admin
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer>
      {/* Tricolore separator */}
      <div className="tricolore-line" />

      {/* Main footer */}
      <div
        style={{
          background: 'linear-gradient(180deg, var(--af-navy-dark) 0%, var(--af-navy) 100%)',
          color: 'white',
        }}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(196,30,58,0.5) 100%)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  AF
                </span>
                <div>
                  <p className="text-base font-bold text-white">Alliance Française</p>
                  <p className="text-xs" style={{ color: 'var(--af-gold-light)' }}>Semarang</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Tempat kursus bahasa Prancis, kegiatan budaya, dan komunitas frankofon di Semarang.
              </p>

              {/* Social icons */}
              <div className="mt-6 flex items-center gap-3">
                {/* Facebook */}
                <a
                  href="#"
                  aria-label="Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href="#"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="#"
                  aria-label="YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.488 3.45.029 5.804 0 12c.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0C23.512 20.55 23.971 18.196 24 12c-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 3.993L9 16z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Tentang column */}
            <div>
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-widest"
                style={{ color: 'var(--af-gold)', fontFamily: 'Inter, sans-serif' }}
              >
                Tentang Kami
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.tentang.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = 'white'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kegiatan column */}
            <div>
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-widest"
                style={{ color: 'var(--af-gold)', fontFamily: 'Inter, sans-serif' }}
              >
                Kegiatan Budaya
              </h3>
              <ul className="space-y-2.5">
                {footerLinks.kegiatan.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                      onMouseOver={(e) => { e.currentTarget.style.color = 'white'; }}
                      onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kontak column */}
            <div>
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-widest"
                style={{ color: 'var(--af-gold)', fontFamily: 'Inter, sans-serif' }}
              >
                Kontak
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--af-gold-light)' }}
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    Semarang, Jawa Tengah, Indonesia
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: 'var(--af-gold-light)' }}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                    info@afsemarang.id
                  </span>
                </li>
              </ul>

              {/* Layanan links */}
              <div className="mt-6">
                {footerLinks.layanan.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="mr-4 text-sm transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.6)' }}
                    onMouseOver={(e) => { e.currentTarget.style.color = 'white'; }}
                    onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              © {year} Alliance Française Semarang. Semua hak dilindungi.
            </p>
            <div className="flex items-center gap-1.5">
              <span className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>Didukung oleh</span>
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--af-gold-light)' }}
              >
                Fondation Alliance Française
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
