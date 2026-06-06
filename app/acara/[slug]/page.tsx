import { getEventBySlug, getPublishedEvents } from '../../../lib/queries';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    return { title: 'Acara Tidak Ditemukan' };
  }

  return {
    title: event.title,
    description: event.summary,
    openGraph: {
      title: event.title,
      description: event.summary,
      images: event.cover_image_url ? [event.cover_image_url] : [],
    },
  };
}

export async function generateStaticParams() {
  const events = await getPublishedEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export const revalidate = 60;

export default async function AcaraDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      {/* Hero / Cover */}
      <div
        style={{
          position: 'relative',
          minHeight: '360px',
          background: event.cover_image_url
            ? `linear-gradient(to bottom, rgba(13,27,62,0.6), rgba(13,27,62,0.85)), url(${event.cover_image_url}) center/cover no-repeat`
            : 'linear-gradient(160deg, var(--af-navy-dark) 0%, var(--af-navy) 60%, var(--af-navy-light) 100%)',
          display: 'flex',
          alignItems: 'flex-end',
          padding: '3rem 1.5rem',
          color: 'white',
        }}
      >
        <div className="mx-auto w-full max-w-4xl" style={{ zIndex: 1 }}>
          <Link
            href="/acara"
            className="inline-flex items-center gap-1 text-xs font-medium mb-4 animate-fade-in"
            style={{ color: 'var(--af-gold)', textDecoration: 'none' }}
          >
            ← Kembali ke Acara
          </Link>
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-2 animate-fade-in"
            style={{ color: 'var(--af-gold)' }}
          >
            {new Date(event.event_date).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in-up"
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.15 }}
          >
            {event.title}
          </h1>
          {event.location && (
            <p
              className="mt-3 text-sm animate-fade-in-up"
              style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.1s' }}
            >
              📍 {event.location}
            </p>
          )}
        </div>
      </div>

      <div className="tricolore-line" />

      {/* Article body */}
      <article className="section-padding">
        <div className="mx-auto max-w-4xl">
          {/* Summary callout */}
          <div
            className="rounded-2xl p-6 mb-8 animate-fade-in-up"
            style={{
              background: 'var(--af-offwhite)',
              borderLeft: '4px solid var(--af-crimson)',
            }}
          >
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--af-text)', fontWeight: 500 }}
            >
              {event.summary}
            </p>
          </div>

          {/* Rich text content */}
          <div
            className="prose-af animate-fade-in-up"
            style={{ animationDelay: '0.15s' }}
            dangerouslySetInnerHTML={{ __html: event.content }}
          />

          {/* Meta info */}
          <div
            className="mt-12 pt-6 border-t flex flex-wrap gap-4 text-xs"
            style={{ borderColor: 'var(--af-gray-100)', color: 'var(--af-gray-300)' }}
          >
            <span>
              Dipublikasikan:{' '}
              {new Date(event.created_at).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            {event.updated_at !== event.created_at && (
              <span>
                Diperbarui:{' '}
                {new Date(event.updated_at).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>
      </article>

      {/* Prose styling for rendered TipTap content */}
      <style>{`
        .prose-af {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--af-text);
        }
        .prose-af h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--af-navy);
          margin: 2rem 0 0.75rem;
          font-family: 'Playfair Display', serif;
        }
        .prose-af h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--af-navy);
          margin: 1.5rem 0 0.5rem;
          font-family: 'Playfair Display', serif;
        }
        .prose-af p {
          margin: 0 0 1rem;
        }
        .prose-af ul, .prose-af ol {
          padding-left: 1.5rem;
          margin: 1rem 0;
        }
        .prose-af li {
          margin: 0.25rem 0;
        }
        .prose-af blockquote {
          border-left: 3px solid var(--af-crimson);
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: var(--af-text-muted);
          font-style: italic;
        }
        .prose-af a {
          color: var(--af-crimson);
          text-decoration: underline;
        }
        .prose-af img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 1.5rem 0;
        }
        .prose-af hr {
          border: none;
          border-top: 2px solid var(--af-gray-100);
          margin: 2rem 0;
        }
      `}</style>
    </>
  );
}
