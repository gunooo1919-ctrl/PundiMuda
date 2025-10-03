// app/materi/page.js

// 1. Deklarasi 'use client'
// Next.js App Router perlu tahu bahwa kode ini berinteraksi dengan browser
'use client'; 

// 2. Import Hooks (Alat Khusus React/Next.js)
import { useState, useRef, useEffect } from 'react';
export default function MateriHarian() {
  // 3. useState: Menyimpan status apakah video sudah selesai atau belum
  // Nilai awalnya adalah 'false' (belum selesai)
  const [videoSelesai, setVideoSelesai] = useState(false);
  
  // 4. useRef: Membuat "kotak" yang bisa kita kaitkan dengan elemen HTML <video>
  const videoRef = useRef(null);

  // 5. useEffect: Melakukan Aksi Sampingan (Side Effects)
  // Kode di sini akan dijalankan setelah komponen dimuat
  useEffect(() => {
    // A. Cek Status di Local Storage saat pertama kali dibuka
    // Local Storage adalah tempat menyimpan status di browser pengguna
    const status = localStorage.getItem('materi1_selesai');
    if (status === 'true') {
      setVideoSelesai(true);
    }

    const videoElement = videoRef.current;
    
    // B. Tambahkan Event Listener (Pendengar)
    if (videoElement) {
      const handleVideoEnd = () => {
        // Ketika video Selesai, ubah status menjadi TRUE
        setVideoSelesai(true);
        // Simpan status ini ke Local Storage agar lain kali dibuka, tombol tetap muncul
        localStorage.setItem('materi1_selesai', 'true');
      };

      videoElement.addEventListener('ended', handleVideoEnd);

      // C. Cleanup Function: Hapus pendengar saat komponen hilang
      return () => {
        videoElement.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []); // Array kosong [] artinya kode ini hanya dijalankan sekali saat komponen dimuat

  const handleLanjut = () => {
    // Nanti kita ganti ini dengan navigasi Next.js ke halaman Tantangan
    alert('SELAMAT! Anda bisa melanjutkan ke Tantangan Menabung!'); 
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Materi Harian #1: Prinsip Dasar Menabung</h1>

      {/* 6. Elemen Video */}
      <video
        ref={videoRef} // Kaitkan videoRef ke elemen ini
        controls
        width="100%"
        poster="https://via.placeholder.com/600x338?text=Video+PundiMuda" 
        style={{ marginBottom: '20px' }}
      >
        {/* Placeholder: Untuk menguji, cukup biarkan video ini kosong. Kita fokus ke logic-nya. */}
        <p>Browser Anda tidak mendukung tag video.</p>
      </video>

      {/* 7. Conditional Rendering (Tombol Hanya Muncul Jika Status TRUE) */}
      {videoSelesai && (
        <button
          onClick={handleLanjut}
          style={{ 
            padding: '10px 20px', 
            fontSize: '18px', 
            backgroundColor: '#0070f3', // Warna biru Next.js
            color: 'white', 
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          ✅ Lanjut ke Tantangan Menabung Harian
        </button>
      )}

      {!videoSelesai && <p style={{ color: 'gray' }}>Tonton video hingga selesai untuk melanjutkan tantangan.</p>}
    </div>
  );
}
