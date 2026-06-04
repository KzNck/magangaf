const halamanBeranda = () => {
  // 1. AREA LOGIKA (Menyimpan Data)
  const salamSapaan = "Selamat Datang di Website Pertamaku!";
  const deskripsi = "Aku sedang belajar Next.js dari nol dan ini adalah hasilnya.";

  // 2. AREA TAMPILAN (Mengembalikan HTML/JSX)
  return (
    <main>
      <h1>{salamSapaan}</h1>
      <p>{deskripsi}</p>
    </main>
  );
};

export default halamanBeranda;