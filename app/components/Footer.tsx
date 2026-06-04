import Link from 'next/link';

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className="border-t mt-12 bg-white/95">
			<div className="mx-auto max-w-7xl px-6 py-8">
				<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center">
					<div>
						<p className="font-semibold">Alliance Française Semarang</p>
						<p className="text-sm text-slate-600">Tempat kursus bahasa Prancis · Budaya · Komunitas</p>
					</div>
					<div className="flex items-center gap-4 text-sm text-slate-600">
						<Link href="/about/siapa-kami">Tentang</Link>
						<Link href="/kegiatan-budaya">Kegiatan</Link>
						<Link href="/perpustakaan">Perpustakaan</Link>
					</div>
				</div>
				<div className="mt-6 text-xs text-slate-500">© {year} Alliance Française Semarang. Semua hak dilindungi.</div>
			</div>
		</footer>
	);
};

export default Footer;
