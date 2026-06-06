import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Admin — Alliance Française Semarang',
    template: '%s | Admin AF Semarang',
  },
  description: 'Panel administrasi Alliance Française Semarang.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Admin layout tanpa Navbar & Footer publik */}
      {children}
    </>
  );
}
