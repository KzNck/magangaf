import Image from 'next/image';
import Link from 'next/link';

const placeholderEvents = [
  {
    id: '1',
    title: 'Contoh Acara: Pekan Budaya',
    day: 'Sabtu',
    date: '2026-06-20',
    time: '19:00',
    place: 'Gedung AF Semarang',
    description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    image: '/next.svg',
    registration: ''
  },
  {
    id: '2',
    title: 'Contoh Acara: Bincang Buku',
    day: 'Minggu',
    date: '2026-07-05',
    time: '15:00',
    place: 'Ruang Diskusi AF',
    description: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>',
    image: '/next.svg',
    registration: 'https://example.com/daftar'
  }
];

export default function KegiatanPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">Kegiatan Budaya</h1>
      <div className="grid gap-6">
        {placeholderEvents.map((ev) => (
          <article key={ev.id} className="flex gap-4 rounded border p-4">
            <div className="w-28 flex-shrink-0">
              <Image src={ev.image} alt={ev.title} width={112} height={48} />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{ev.title}</h2>
              <p className="text-sm text-slate-600">{ev.day}, {ev.date} · {ev.time} · {ev.place}</p>
              <div className="mt-2 text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: ev.description }} />
              <div className="mt-3 flex gap-3">
                <Link href={`/kegiatan-budaya/event/${ev.id}`} className="text-sm font-medium text-slate-900">Detail</Link>
                {ev.registration ? (
                  <a href={ev.registration} target="_blank" rel="noreferrer" className="text-sm text-indigo-600">Daftar</a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
