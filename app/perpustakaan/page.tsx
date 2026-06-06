import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Perpustakaan & Mediatek',
  description:
    'Jelajahi koleksi perpustakaan dan mediatek Alliance Française Semarang — buku, majalah, DVD, dan akses Culturethèque.',
};

export default function PerpustakaanPage() {
  const services = [
    {
      title: 'Perpustakaan Mediatek',
      desc: 'Koleksi buku, majalah, BD (bande dessinée), DVD, dan CD musik Prancis yang dapat dipinjam oleh anggota.',
      href: '/perpustakaan/perpustakaan-mediatek',
      icon: '📖',
      color: 'var(--af-navy)',
    },
    {
      title: 'Culturethèque',
      desc: 'Platform digital perpustakaan Prancis — akses gratis ke ribuan e-book, film, musik, dan majalah dalam bahasa Prancis.',
      href: '/perpustakaan/culturetheque',
      icon: '💻',
      color: 'var(--af-crimson)',
    },
    {
      title: 'Menjadi Anggota',
      desc: 'Daftar sebagai anggota untuk menikmati seluruh layanan perpustakaan dan fasilitas eksklusif lainnya.',
      href: '/perpustakaan/menjadi-anggota',
      icon: '🎫',
      color: 'var(--af-gold)',
    },
  ];

  return (
    <>
      <div className="page-header">
        <div className="relative mx-auto max-w-6xl" style={{ zIndex: 1 }}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-in"
            style={{ color: 'var(--af-gold)' }}
          >
            Bibliothèque & Médiathèque
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in-up"
            style={{ color: 'white', fontFamily: "'Playfair Display', serif" }}
          >
            Perpustakaan
          </h1>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl animate-fade-in-up"
            style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.15s' }}
          >
            Akses koleksi lengkap perpustakaan fisik dan digital Alliance Française Semarang.
          </p>
        </div>
      </div>
      <div className="tricolore-line" />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 md:grid-cols-3 stagger-children">
            {services.map((svc) => (
              <Link
                key={svc.title}
                href={svc.href}
                className="card-elevated block animate-fade-in-up"
                style={{ textDecoration: 'none' }}
              >
                <div
                  style={{
                    height: '6px',
                    background: svc.color,
                    borderRadius: '16px 16px 0 0',
                  }}
                />
                <div className="p-6">
                  <span className="text-3xl mb-3 block">{svc.icon}</span>
                  <h2
                    className="text-lg font-bold mb-2"
                    style={{
                      color: 'var(--af-navy)',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {svc.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--af-text-muted)' }}
                  >
                    {svc.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
