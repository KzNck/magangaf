import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Kenali lebih dekat Alliance Française Semarang — pusat bahasa Prancis dan budaya frankofon di Semarang sejak tahun 1990.',
};

export default function TentangKamiPage() {
  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="relative mx-auto max-w-6xl" style={{ zIndex: 1 }}>
          <p
            className="text-xs font-semibold uppercase tracking-[0.2em] mb-3 animate-fade-in"
            style={{ color: 'var(--af-gold)' }}
          >
            Alliance Française Semarang
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in-up"
            style={{ color: 'white', fontFamily: "'Playfair Display', serif" }}
          >
            Tentang Kami
          </h1>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl animate-fade-in-up"
            style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.15s' }}
          >
            Mempromosikan bahasa Prancis dan budaya frankofon di jantung kota Semarang
            melalui pendidikan, seni, dan kegiatan komunitas.
          </p>
        </div>
      </div>
      <div className="tricolore-line" />

      <section className="section-padding">
        <div className="mx-auto max-w-4xl">
          {/* Mission */}
          <div className="mb-12 animate-fade-in-up">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Misi Kami
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--af-text-muted)' }}>
              Alliance Française Semarang adalah bagian dari jaringan global Alliance Française
              yang berdiri di lebih dari 130 negara. Kami berkomitmen untuk mengajarkan bahasa
              Prancis, mempromosikan budaya frankofon, dan membangun jembatan kebudayaan antara
              Indonesia dan Prancis. Sebagai pusat kebudayaan, kami menawarkan kursus bahasa,
              perpustakaan, dan beragam kegiatan budaya yang terbuka untuk semua kalangan.
            </p>
          </div>

          {/* Values grid */}
          <div className="grid gap-6 md:grid-cols-3 stagger-children mb-12">
            {[
              {
                title: 'Pendidikan Berkualitas',
                desc: 'Kurikulum resmi dengan pengajar bersertifikasi DELF/DALF untuk semua tingkatan.',
                icon: '📚',
              },
              {
                title: 'Keragaman Budaya',
                desc: 'Kegiatan seni, sinema, musik, dan sastra yang memperkaya wawasan budaya.',
                icon: '🎭',
              },
              {
                title: 'Komunitas Terbuka',
                desc: 'Ruang inklusif bagi semua yang ingin belajar dan berbagi budaya frankofon.',
                icon: '🤝',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="card-elevated p-6 animate-fade-in-up"
              >
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--af-text-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Contact info */}
          <div
            className="rounded-2xl p-6 md:p-8 animate-fade-in-up"
            style={{
              background: 'linear-gradient(135deg, var(--af-navy) 0%, var(--af-navy-light) 100%)',
              color: 'white',
            }}
          >
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: 'white', fontFamily: "'Playfair Display', serif" }}
            >
              Hubungi Kami
            </h2>
            <div className="grid gap-4 md:grid-cols-2 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
              <div>
                <p className="font-semibold text-white mb-1">Alamat</p>
                <p>Alliance Française Semarang</p>
                <p>Jl. Pemuda, Semarang, Jawa Tengah</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Kontak</p>
                <p>info@afsemarang.id</p>
                <p>(024) XXXX-XXXX</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
