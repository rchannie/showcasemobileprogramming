/*
 * DATA WEBSITE SHOWCASE IK300 MOBILE PROGRAMMING
 * Cukup edit file ini untuk mengganti isi website.
 *
 * Aturan singkat:
 * - Teks yang belum ada biarkan kosong ("") atau hapus barisnya.
 * - Gambar tidak perlu ditulis di sini selama nama file mengikuti format
 *   dan disimpan di folder assets/proyek/Kxx/ (lihat README.md):
 *     Kxx_logo.png, Kxx_ss01.png, Kxx_ss02.png, dan seterusnya
 *     Kxx_Slide.pdf, Kxx_SKPL.pdf, Kxx_PanduanPengguna.pdf
 *   Tombol Slide, SKPL, dan Panduan Pengguna otomatis muncul kalau file-nya ada.
 * - Tautan APK, GitHub, dan video demo ditulis di bagian "tautan".
 */

window.SITUS = {
  judulKecil: "Tugas Besar Pengganti UAS",
  mataKuliah: "IK300 Mobile Programming",
  kelas: "PILKOM 5A 2024",
  programStudi: "Pendidikan Ilmu Komputer",
  fakultas: "Fakultas Pendidikan Matematika dan Ilmu Pengetahuan Alam",
  universitas: "Universitas Pendidikan Indonesia",
  dosen: "Erlangga, S.Kom., M.T.",
  pengantar:
    "Halaman ini memuat aplikasi pembelajaran yang dikembangkan setiap kelompok, lengkap dengan video demo, tangkapan layar, dan berkas unduhannya.",

  // "kartu" atau "lengkap": tampilan yang muncul pertama kali.
  tampilanAwal: "kartu",

  // true: kolom yang masih kosong ditandai "Belum diisi" (berguna selama pengisian data).
  // false: kolom kosong disembunyikan. Ganti ke false sebelum website dibagikan.
  tandaiKolomKosong: true
};

window.PROYEK = [
  {
    kelompok: 7,
    nama: "SQLidik",
    jenjang: "SMK",
    versi: "",
    deskripsiSingkat:
      "Aplikasi belajar SQL berbentuk game detektif untuk siswa SMK. Siswa memecahkan kasus dengan menulis query, dan guru memantau progres siswa melalui Mode Kelas.",
    masalahBelajar:
      "Pada pembelajaran basis data di SMK, SQL umumnya dipelajari melalui penjelasan sintaks dan latihan query yang berdiri sendiri. Cara ini membuat sebagian siswa sulit melihat kegunaan setiap perintah dan cepat bosan saat berlatih.",
    tujuanPembelajaran: "",
    // Bisa berupa daftar langkah ["Langkah 1", "Langkah 2"] atau satu paragraf "..."
    alurPenggunaan: [],
    fitur: [
      { nama: "Misi Detektif", penjelasan: "Menyelesaikan kasus dengan menulis query SQL untuk menemukan petunjuk." },
      { nama: "Materi Singkat", penjelasan: "Materi SQL dibagi menjadi sesi pendek yang dapat diselesaikan dalam beberapa menit." },
      { nama: "Streak Harian", penjelasan: "Mencatat jumlah hari belajar berturut-turut agar siswa terbiasa belajar rutin." },
      { nama: "Mode Kelas", penjelasan: "Guru dapat membuat kelas dan memantau progres belajar setiap siswa." }
    ],
    anggota: [
      { nama: "Hanif Habiburrahman", peran: "" },
      { nama: "Kaisya Azzahra Salsabila", peran: "" },
      { nama: "Kayla Emira Qonitah", peran: "" },
      { nama: "Muhammad Raditya Santosa", peran: "" },
      { nama: "Rifa Nur Habibah", peran: "" }
    ],
    teknologi: "React Native, FastAPI, Supabase",
    kebutuhanPerangkat: "",
    caraInstalasi: "",
    kontak: "",
    tautan: {
      apk: "",
      github: "",
      video: ""
    }
  },

  /* Kelompok lain: salin blok di bawah ini untuk setiap kelompok, lalu isi. */
  { kelompok: 1, nama: "", jenjang: "", deskripsiSingkat: "", fitur: [], anggota: [], tautan: {} },
  { kelompok: 2, nama: "", jenjang: "", deskripsiSingkat: "", fitur: [], anggota: [], tautan: {} },
  { kelompok: 3, nama: "", jenjang: "", deskripsiSingkat: "", fitur: [], anggota: [], tautan: {} },
  { kelompok: 4, nama: "", jenjang: "", deskripsiSingkat: "", fitur: [], anggota: [], tautan: {} },
  { kelompok: 5, nama: "", jenjang: "", deskripsiSingkat: "", fitur: [], anggota: [], tautan: {} },
  { kelompok: 6, nama: "", jenjang: "", deskripsiSingkat: "", fitur: [], anggota: [], tautan: {} },
  { kelompok: 8, nama: "", jenjang: "", deskripsiSingkat: "", fitur: [], anggota: [], tautan: {} }
];

/*
 * Contoh lengkap satu kelompok (semua kolom yang bisa diisi):
 *
 * {
 *   kelompok: 3,
 *   nama: "Nama Aplikasi",
 *   jenjang: "SMA",                       // SD, SMP, SMA, atau SMK
 *   versi: "1.0.0",
 *   deskripsiSingkat: "Maksimal 200 karakter.",
 *   masalahBelajar: "...",
 *   tujuanPembelajaran: "...",
 *   alurPenggunaan: ["Masuk ke aplikasi", "Pilih materi", "Kerjakan latihan"],
 *   fitur: [
 *     { nama: "Nama fitur", penjelasan: "Satu kalimat." }   // gambar: Kxx_ss01.png
 *   ],
 *   anggota: [ { nama: "Nama Lengkap", peran: "Frontend" } ],
 *   teknologi: "Flutter, Firebase",
 *   kebutuhanPerangkat: "Android 8.0 ke atas, perlu internet",
 *   caraInstalasi: "Unduh APK, izinkan instalasi dari sumber tidak dikenal, lalu pasang.",
 *   kontak: "email@kelompok.com",
 *   tautan: {
 *     apk: "https://drive.google.com/...",      // disarankan link Drive atau GitHub Releases
 *     github: "https://github.com/...",
 *     video: "https://youtu.be/...",            // YouTube atau link file Google Drive
 *     slide: "", skpl: "", panduan: ""          // opsional, kalau tidak pakai file di folder
 *   }
 * }
 */
