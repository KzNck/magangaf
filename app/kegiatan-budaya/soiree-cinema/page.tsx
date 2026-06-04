// 1. Ini adalah wujud Arrow Function untuk halaman web
const HalamanBeranda = () => {

  // 2. AREA LOGIKA JAVASCRIPT
  // Di sini kamu menggunakan let dan const yang sudah kita pelajari
  const salamSapaan = "Halo, Dunia!";
  const namaPanggilan = "Calon Software Engineer";

  // 3. AREA TAMPILAN (JSX)
  // Di sinilah kamu menulis "kode HTML" yang akan muncul di layar pengunjung
  return (
    <main>
      <h1>{salamSapaan}</h1>
      <p>Selamat datang di website pertama milik {namaPanggilan}.</p>
    </main>
  );
};

// 4. Baris wajib agar Next.js tahu ini adalah halaman yang harus ditampilkan
export default HalamanBeranda;