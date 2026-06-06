import { getPublishedEvents } from '../../lib/queries';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Acara & Kegiatan',
  description:
    'Ikuti beragam acara dan kegiatan budaya yang diselenggarakan oleh Alliance Française Semarang.',
};

export const revalidate = 60; // ISR: revalidate setiap 60 detik

export default async function AcaraPage() {
  const events = await getPublishedEvents();

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div
          className="relative mx-auto max-w-6xl"
          style={{ zIndex: 1 }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-in"
            style={{ color: 'var(--af-gold)' }}
          >
            Acara & Kegiatan
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in-up"
            style={{ color: 'white', fontFamily: "'Playfair Display', serif" }}
          >
            Agenda Budaya
          </h1>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl animate-fade-in-up"
            style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.15s' }}
          >
            Temukan beragam acara budaya, seni, dan pendidikan yang kami selenggarakan
            untuk mempererat hubungan Indonesia dan Prancis.
          </p>
        </div>
      </div>

      <div className="tricolore-line" />

      {/* Content */}
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          {events.length === 0 ? (
            <div className="py-16 text-center">
              <p
                className="text-lg font-semibold"
                style={{ color: 'var(--af-navy)' }}
              >
                Belum ada acara yang dipublikasikan.
              </p>
              <p className="mt-2 text-sm" style={{ color: 'var(--af-text-muted)' }}>
                Nantikan acara terbaru dari Alliance Française Semarang.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 stagger-children">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/acara/${event.slug}`}
                  className="card-elevated block animate-fade-in-up"
                  style={{ textDecoration: 'none' }}
                >
                  {/* Cover image */}
                  {event.cover_image_url && (
                    <div
                      style={{
                        height: '200px',
                        background: `url(${event.cover_image_url}) center/cover no-repeat`,
                        borderRadius: '16px 16px 0 0',
                      }}
                    />
                  )}
                  {!event.cover_image_url && (
                    <div
                      style={{
                        height: '200px',
                        background:
                          'linear-gradient(135deg, var(--af-navy) 0%, var(--af-navy-light) 100%)',
                        borderRadius: '16px 16px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span
                        style={{
                          color: 'rgba(255,255,255,0.3)',
                          fontSize: '2rem',
                          fontFamily: "'Playfair Display', serif",
                        }}
                      >
                        AF
                      </span>
                    </div>
                  )}

                  <div style={{ padding: '20px' }}>
                    <p
                      className="text-xs font-medium mb-2"
                      style={{ color: 'var(--af-crimson)' }}
                    >
                      {new Date(event.event_date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{
                        color: 'var(--af-navy)',
                        fontFamily: "'Playfair Display', serif",
                        lineHeight: 1.3,
                      }}
                    >
                      {event.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--af-text-muted)' }}
                    >
                      {event.summary.substring(0, 150)}
                      {event.summary.length > 150 ? '...' : ''}
                    </p>
                    {event.location && (
                      <p
                        className="text-xs mt-3"
                        style={{ color: 'var(--af-gray-300)' }}
                      >
                        📍 {event.location}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
