import Image from 'next/image';

interface Props {
  params: { id: string };
}

const placeholderMap: { [key: string]: any } = {
  '1': {
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
  '2': {
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
};

export default function EventPage({ params }: Props) {
  const ev = placeholderMap[params.id] ?? placeholderMap['1'];
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-4 text-3xl font-bold">{ev.title}</h1>
      <p className="text-sm text-slate-600">{ev.day}, {ev.date} · {ev.time} · {ev.place}</p>
      <div className="mt-6">
        <Image src={ev.image} alt={ev.title} width={600} height={120} />
      </div>
      <div className="mt-6 prose max-w-none" dangerouslySetInnerHTML={{ __html: ev.description }} />
      {ev.registration ? (
        <p className="mt-6"><a href={ev.registration} className="text-indigo-600">Link Registrasi</a></p>
      ) : null}
    </main>
  );
}
