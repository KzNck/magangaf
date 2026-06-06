import Link from 'next/link';

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
};

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 animate-fade-in"
          >
            <ol className="flex flex-wrap items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Beranda
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  {crumb.href ? (
                    <Link href={crumb.href} className="transition-colors hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title */}
        <h1
          className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl animate-fade-in-up"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p
            className="mt-3 max-w-2xl text-base md:text-lg animate-fade-in-up"
            style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.15s' }}
          >
            {subtitle}
          </p>
        )}

        {/* Decorative tricolore line */}
        <div
          className="mt-6 h-1 w-20 rounded-full animate-fade-in-up"
          style={{
            background: 'linear-gradient(90deg, #FFFFFF 33%, #C9A962 66%, #C41E3A 100%)',
            animationDelay: '0.25s',
          }}
        />
      </div>
    </div>
  );
}
