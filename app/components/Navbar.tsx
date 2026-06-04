import Link from 'next/link';

const Navbar = () => {
  const namaWeb = 'Alliance Française Semarang';
  const navItems = [
    { label: 'Beranda', href: '/' },
    { label: 'Tentang Kami', href: '/about/siapa-kami' },
    { label: 'Kegiatan', href: '/kegiatan-budaya' },
    { label: 'Perpustakaan', href: '/perpustakaan' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-semibold text-white shadow-lg shadow-slate-900/10">
            AF
          </span>
          <div>
            <p className="text-base font-semibold text-slate-900">{namaWeb}</p>
            <p className="text-xs text-slate-500">Budaya · Bahasa · Komunitas</p>
          </div>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          <ul className="flex items-center gap-6 text-sm font-medium text-slate-700">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/perpustakaan/menjadi-anggota"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Jadi Anggota
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
