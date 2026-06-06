import Link from 'next/link';
import { getUpcomingEvents } from '../lib/queries';

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    title: 'Kursus Bahasa Prancis',
    description: 'Kelas berkualitas dari pengajar bersertifikat, mulai dari pemula hingga mahir.',
    href: '/kursus',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: 'Kegiatan Budaya',
    description: 'Festival, pameran, konser, dan acara budaya Prancis yang memperkaya wawasan.',
    href: '/acara',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    title: 'Perpustakaan & Mediatek',
    description: 'Koleksi buku, film, musik, dan media digital berbahasa Prancis.',
    href: '/perpustakaan',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
    title: 'Sertifikasi DELF/DALF',
    description: 'Ujian resmi bahasa Prancis yang diakui secara internasional.',
    href: '/sertifikasi',
  },
];



export default async function HomePage() {
  const upcomingEvents = await getUpcomingEvents(3);

  return (
    <>
      {/* ==========================================
          HERO SECTION
          ========================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #080F24 0%, #0D1B3E 25%, #1A2D5A 55%, #6B1525 100%)',
          minHeight: '85vh',
        }}
      >
        {/* Decorative circles */}
        <div
          className="absolute animate-float"
          style={{
            top: '10%', right: '5%', width: '350px', height: '350px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(196,30,58,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: '5%', left: '10%', width: '250px', height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,169,98,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            animation: 'float 8s ease-in-out infinite reverse',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-5 md:px-8" style={{ minHeight: '85vh' }}>
          <div className="text-center">
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium tracking-wider uppercase animate-fade-in"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'var(--af-gold-light)',
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: 'var(--af-gold)' }}
              />
              Bienvenue — Selamat Datang
            </div>

            {/* Heading */}
            <h1
              className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Alliance{' '}
              <span className="gradient-text">Française</span>
              <br />
              Semarang
            </h1>

            {/* Subtitle */}
            <p
              className="mx-auto mt-6 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed animate-fade-in-up"
              style={{ color: 'rgba(255,255,255,0.65)', animationDelay: '0.2s' }}
            >
              Pusat bahasa Prancis dan kegiatan budaya frankofon di Semarang.
              Belajar, berkarya, dan terhubung dengan dunia.
            </p>

            {/* CTA Buttons */}
            <div
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in-up"
              style={{ animationDelay: '0.35s' }}
            >
              <Link href="/acara" className="btn-primary" style={{ padding: '14px 32px' }}>
                Jelajahi Kegiatan
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
              <Link href="/tentang-kami" className="btn-secondary" style={{ padding: '14px 32px' }}>
                Tentang Kami
              </Link>
            </div>

            {/* Stats row */}
            <div
              className="mt-16 grid grid-cols-3 gap-6 sm:gap-10 animate-fade-in-up"
              style={{ animationDelay: '0.5s' }}
            >
              {[
                { number: '130+', label: 'Tahun Jaringan Global' },
                { number: '800+', label: 'Cabang di Dunia' },
                { number: '∞', label: 'Kesempatan Belajar' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-2xl font-bold sm:text-3xl md:text-4xl"
                    style={{ color: 'var(--af-gold-light)', fontFamily: "'Playfair Display', serif" }}
                  >
                    {stat.number}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave/gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{ background: 'linear-gradient(to top, var(--af-offwhite) 0%, transparent 100%)' }}
        />
      </section>

      {/* ==========================================
          FEATURES SECTION
          ========================================== */}
      <section className="section-padding" style={{ background: 'var(--af-offwhite)' }}>
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 text-center md:mb-16">
            <p
              className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--af-crimson)' }}
            >
              Apa yang Kami Tawarkan
            </p>
            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Dunia Prancis di Semarang
            </h2>
            <div
              className="mx-auto mt-4 h-1 w-16 rounded-full"
              style={{ background: 'linear-gradient(90deg, var(--af-navy), var(--af-crimson))' }}
            />
          </div>

          {/* Feature cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.href}
                className="card-elevated group block p-7 animate-fade-in-up"
              >
                <div
                  className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(135deg, rgba(13,27,62,0.06) 0%, rgba(196,30,58,0.06) 100%)',
                    color: 'var(--af-navy)',
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="mb-2 text-lg font-semibold"
                  style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--af-text-muted)' }}>
                  {feature.description}
                </p>
                <div
                  className="mt-4 flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2"
                  style={{ color: 'var(--af-crimson)' }}
                >
                  Selengkapnya
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          UPCOMING EVENTS SECTION
          ========================================== */}
      <section className="section-padding" style={{ background: 'white' }}>
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p
                className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--af-crimson)' }}
              >
                Agenda
              </p>
              <h2
                className="text-3xl font-bold md:text-4xl"
                style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
              >
                Kegiatan Mendatang
              </h2>
            </div>
            <Link
              href="/acara"
              className="flex items-center gap-2 text-sm font-semibold transition-all duration-200"
              style={{ color: 'var(--af-crimson)' }}
            >
              Lihat Semua
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Event cards */}
          {upcomingEvents.length === 0 ? (
            <div className="py-12 text-center rounded-2xl border" style={{ borderColor: 'var(--af-gray-100)', background: 'var(--af-offwhite)' }}>
              <p className="text-sm" style={{ color: 'var(--af-text-muted)' }}>Belum ada acara mendatang yang dijadwalkan.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-3 stagger-children">
              {upcomingEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/acara/${event.slug}`}
                  className="card-elevated group block animate-fade-in-up"
                >
                  {/* Gradient header */}
                  <div
                    className="px-6 py-5 h-32 flex flex-col justify-end"
                    style={{
                      background: event.cover_image_url
                        ? `linear-gradient(to top, rgba(13,27,62,0.9) 0%, rgba(13,27,62,0.4) 100%), url(${event.cover_image_url})` 
                        : 'linear-gradient(135deg, var(--af-navy) 0%, var(--af-navy-light) 100%)',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      borderRadius: '16px 16px 0 0',
                    }}
                  >
                    <p className="text-xs font-medium uppercase tracking-widest drop-shadow-md" style={{ color: 'var(--af-gold-light)' }}>
                      {new Date(event.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                    <h3
                      className="mt-1 text-lg font-bold text-white drop-shadow-md line-clamp-2"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {event.title}
                    </h3>
                  </div>

                  {/* Details */}
                  <div className="px-6 py-5">
                    <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--af-text-muted)' }}>
                      {event.summary}
                    </p>
                    {event.location && (
                      <div className="mt-3 flex items-center gap-2 text-sm" style={{ color: 'var(--af-gray-300)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                    <div
                      className="mt-4 flex items-center gap-1 text-sm font-medium transition-all duration-300 group-hover:gap-2"
                      style={{ color: 'var(--af-crimson)' }}
                    >
                      Detail Acara
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ==========================================
          CTA SECTION — JADI ANGGOTA
          ========================================== */}
      <section
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, var(--af-navy-dark) 0%, var(--af-navy) 50%, #3D1520 100%)',
        }}
      >
        {/* Decorative */}
        <div
          className="absolute"
          style={{
            top: '-20%', right: '-10%', width: '400px', height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(201,169,98,0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-5 py-20 text-center md:px-8 md:py-28">
          <h2
            className="text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bergabunglah dengan{' '}
            <span className="gradient-text">Komunitas Kami</span>
          </h2>
          <p
            className="mx-auto mt-5 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.65)' }}
          >
            Dapatkan akses ke kursus bahasa, kegiatan budaya, perpustakaan, dan jaringan frankofon internasional.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/perpustakaan/menjadi-anggota" className="btn-primary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
              Jadi Anggota Sekarang
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link href="/tentang-kami" className="btn-secondary" style={{ padding: '16px 36px', fontSize: '1rem' }}>
              Punya Pertanyaan?
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}