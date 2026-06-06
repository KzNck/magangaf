import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kursus Bahasa Prancis',
  description:
    'Pilih program kursus bahasa Prancis yang sesuai dengan kebutuhan Anda di Alliance Française Semarang — tersedia kelas reguler, privat, dan khusus.',
};

export default function KursusPage() {
  const programs = [
    {
      title: 'Kelas Reguler',
      subtitle: 'Kursus Kelompok',
      desc: 'Belajar bersama dalam kelompok kecil (8-15 orang) dengan kurikulum terstruktur dari tingkat A1 hingga C2. Jadwal fleksibel: pagi, siang, dan malam.',
      features: ['Kelompok kecil 8-15 peserta', 'Kurikulum CECRL A1–C2', 'Jadwal fleksibel', 'Sertifikat kelulusan'],
      color: 'var(--af-navy)',
    },
    {
      title: 'Kelas Privat',
      subtitle: 'Kursus Individual',
      desc: 'Dapatkan perhatian penuh dari pengajar dengan program yang disesuaikan secara khusus untuk kebutuhan dan tujuan belajar Anda.',
      features: ['1-on-1 dengan pengajar', 'Program disesuaikan', 'Jadwal sesuai permintaan', 'Kemajuan lebih cepat'],
      color: 'var(--af-crimson)',
    },
    {
      title: 'Kelas Khusus',
      subtitle: 'Program Tematik',
      desc: 'Program spesialis: Français des Affaires, persiapan DELF/DALF, kelas anak-anak, kelas korporat, dan workshop tematik.',
      features: ['Français des Affaires', 'Persiapan ujian DELF/DALF', 'Kelas anak-anak', 'Kelas korporat'],
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
            Programme de Cours
          </p>
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold animate-fade-in-up"
            style={{ color: 'white', fontFamily: "'Playfair Display', serif" }}
          >
            Kursus Bahasa Prancis
          </h1>
          <p
            className="mt-4 text-base md:text-lg max-w-2xl animate-fade-in-up"
            style={{ color: 'rgba(255,255,255,0.7)', animationDelay: '0.15s' }}
          >
            Temukan program kursus yang tepat untuk memulai atau melanjutkan perjalanan
            belajar bahasa Prancis Anda bersama pengajar profesional.
          </p>
        </div>
      </div>
      <div className="tricolore-line" />

      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-3 stagger-children">
            {programs.map((prog) => (
              <div key={prog.title} className="card-elevated animate-fade-in-up">
                <div
                  style={{
                    height: '8px',
                    background: prog.color,
                    borderRadius: '16px 16px 0 0',
                  }}
                />
                <div className="p-6 md:p-8">
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: prog.color }}
                  >
                    {prog.subtitle}
                  </p>
                  <h2
                    className="text-xl font-bold mb-3"
                    style={{
                      color: 'var(--af-navy)',
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {prog.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed mb-5"
                    style={{ color: 'var(--af-text-muted)' }}
                  >
                    {prog.desc}
                  </p>
                  <ul className="space-y-2">
                    {prog.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'var(--af-text)' }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: prog.color }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center animate-fade-in-up">
            <p
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--af-navy)', fontFamily: "'Playfair Display', serif" }}
            >
              Tertarik mendaftar?
            </p>
            <p className="text-sm mb-6" style={{ color: 'var(--af-text-muted)' }}>
              Hubungi kami untuk informasi lebih lanjut tentang jadwal, biaya, dan pendaftaran.
            </p>
            <a href="mailto:info@afsemarang.id" className="btn-primary">
              Hubungi Kami
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
