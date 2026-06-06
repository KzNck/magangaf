// 1. AREA IMPORT (Memanggil balok Lego Navbar dari folder components)
import type { Metadata } from 'next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Alliance Française Semarang — Kursus Bahasa Prancis & Kegiatan Budaya',
    template: '%s | Alliance Française Semarang',
  },
  description:
    'Alliance Française Semarang: tempat kursus bahasa Prancis, kegiatan budaya, perpustakaan, dan sertifikasi DELF/DALF di Semarang.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>

        {/* Ini adalah Navbar yang terpasang kokoh di atas bingkai */}
        <Navbar />

        {/* Ini adalah perwakilan dari page.tsx yang akan berubah-ubah posisinya di bawah Navbar */}
        <main>
          {children}
        </main>

        {/* Footer global */}
        <Footer />

      </body>
    </html>
  );
}