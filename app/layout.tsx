// 1. AREA IMPORT (Memanggil balok Lego Navbar dari folder components)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function RootLayout({ children } : { children: React.ReactNode  }) {
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