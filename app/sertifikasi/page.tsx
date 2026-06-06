import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sertifikasi DELF/DALF',
  description:
    'Informasi lengkap tentang ujian sertifikasi DELF dan DALF di Alliance Française Semarang — jadwal ujian, tingkatan, dan persiapan.',
};

export default function SertifikasiPage() {
  const levels = [
    {
      code: 'A1',
      name: 'DELF A1',
      desc: 'Pemula — mampu berkomunikasi dalam situasi sederhana dan familiar.',
      color: '#60a5fa',
    },
    {
      code: 'A2',
      name: 'DELF A2',
      desc: 'Dasar — mampu menangani pertukaran informasi sederhana sehari-hari.',
      color: '#34d399',
    },
    {
      code: 'B1',
      name: 'DELF B1',
      desc: 'Menengah — mandiri dalam perjalanan dan mampu mengungkapkan pendapat.',
      color: 'var(--af-gold)',
    },
    {
      code: 'B2',
      name: 'DELF B2',
      desc: 'Mahir — mampu berargumentasi dan memahami teks kompleks.',
      color: '#f97316',
    },
    {
      code: 'C1',
      name: 'DALF C1',
      desc: 'Lanjutan — kemampuan ekspresif untuk konteks akademik dan profesional.',
      color: 'var(--af-crimson)',
    },
    {
      code: 'C2',
      name: 'DALF C2',
      desc: 'Mahir sempurna — penguasaan bahasa tingkat native speaker.',
      color: 'var(--af-navy)',
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
            Certifications Officielles
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in-up"
            style={{ color: 'white', fontFamily: "'Playfair Display', serif" }}
          >
            Sertifikasi DELF/DALF
          </h1>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl animate-fade-in-up"
            style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.15s' }}
          >
            Diploma resmi dari Kementerian Pendidikan Prancis yang diakui secara internasional.
            Buktikan kemampuan bahasa Prancis Anda dengan sertifikasi bergengsi.
          </p>
        </div>
      </div>
      <div className="tricolore-line" />

      <section className="section-padding">
        <div className="mx-auto max-w-5xl">
          {/* Info banner */}
          <div
            className="rounded-2xl p-6 md:p-8 mb-10 animate-fade-in-up"
            style={{
              background: 'var(--af-offwhite)',
              borderLeft: '4px solid var(--af-crimson)',
            }}
          >
            <h2
              className="text-lg font-bold mb-2"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Apa itu DELF & DALF?
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--af-text-muted)' }}>
              <strong>DELF</strong> (Diplôme d'Études en Langue Française) dan <strong>DALF</strong>{' '}
              (Diplôme Approfondi de Langue Française) adalah diploma resmi yang dikeluarkan oleh
              Kementerian Pendidikan Nasional Prancis. Sertifikasi ini berlaku seumur hidup dan diakui
              di seluruh dunia untuk keperluan studi, kerja, dan imigrasi.
            </p>
          </div>

          {/* Levels grid */}
          <h2
            className="text-2xl font-bold mb-6"
            style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
          >
            Tingkat Kemahiran
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 stagger-children mb-12">
            {levels.map((level) => (
              <div key={level.code} className="card-elevated p-5 animate-fade-in-up">
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold text-white"
                    style={{ background: level.color }}
                  >
                    {level.code}
                  </span>
                  <h3
                    className="text-base font-bold"
                    style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
                  >
                    {level.name}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--af-text-muted)' }}>
                  {level.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Registration CTA */}
          <div
            className="rounded-2xl p-6 md:p-8 text-center animate-fade-in-up"
            style={{
              background: 'linear-gradient(135deg, var(--af-navy) 0%, var(--af-navy-light) 100%)',
              color: 'white',
            }}
          >
            <h2
              className="text-xl font-bold mb-3"
              style={{ color: 'white', fontFamily: "'Playfair Display', serif" }}
            >
              Daftar Ujian DELF/DALF
            </h2>
            <p className="text-sm mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Hubungi kami untuk informasi jadwal ujian berikutnya dan proses pendaftaran.
            </p>
            <a href="mailto:info@afsemarang.id" className="btn-primary">
              Daftar Sekarang
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
