# Showcase Tugas Besar IK300 Mobile Programming PILKOM 5A 2024

Website statis (HTML, CSS, JavaScript biasa) untuk menampilkan proyek tugas besar setiap kelompok. Tidak memakai backend dan tidak perlu proses build.

## Struktur folder

```
index.html                 halaman utama
data/proyek.js             SEMUA ISI WEBSITE (cukup edit file ini)
assets/css/style.css       tampilan
assets/js/app.js           logika halaman (tidak perlu diubah)
assets/img/                logo UPI-FPMIPA, CSE, dan Diktisaintek
assets/proyek/K01 ... K08  aset tiap kelompok (logo, tangkapan layar, PDF)
```

## Mengisi data

Buka `data/proyek.js`.

- `SITUS` berisi judul, nama kelas, prodi, dan dosen.
- `PROYEK` berisi satu blok per kelompok. Contoh yang sudah terisi ada di Kelompok 7 (SQLidik), dan contoh semua kolom ada di bagian bawah file.
- Kolom yang belum ada boleh dibiarkan kosong.
- Selama data belum lengkap, `tandaiKolomKosong: true` membuat kolom kosong ditandai "Belum diisi". Ganti ke `false` sebelum website dibagikan supaya kolom kosong disembunyikan.
- Tambah atau hapus blok kelompok sesuai jumlah kelompok di kelas, lalu buat foldernya di `assets/proyek/`.

## Menaruh aset

Simpan file di `assets/proyek/Kxx/` (xx = nomor kelompok dua digit) dengan nama berikut. Website otomatis memakainya tanpa perlu menulis path di `proyek.js`.

| Aset | Nama file |
| --- | --- |
| Logo aplikasi | `Kxx_logo.png` |
| Tangkapan layar fitur ke-1, ke-2, dst. | `Kxx_ss01.png`, `Kxx_ss02.png`, ... (urutan sama dengan daftar `fitur`) |
| Slide presentasi | `Kxx_Slide.pdf` |
| SKPL | `Kxx_SKPL.pdf` |
| Panduan pengguna | `Kxx_PanduanPengguna.pdf` |

- Gambar yang belum ada otomatis diganti kotak placeholder.
- Tombol Slide, SKPL, dan Panduan Pengguna baru muncul kalau file PDF-nya sudah ada di folder.
- Nama file peka huruf besar dan kecil di Vercel: `K07_logo.png` tidak sama dengan `k07_Logo.PNG`.
- Kalau gambar berformat lain (misalnya .jpg), tulis path-nya langsung di `proyek.js`, misalnya `logo: "assets/proyek/K07/logo.jpg"`, atau `gambar: "..."` di dalam `fitur`.

APK sebaiknya tidak disimpan di repository karena ukurannya besar (GitHub menolak file di atas 100 MB). Unggah ke Google Drive atau GitHub Releases, lalu tulis tautannya di `tautan.apk`. Video demo cukup tautan YouTube atau Google Drive di `tautan.video`.

## Mencoba di komputer sendiri

Buka folder ini dengan server lokal, misalnya ekstensi Live Server di VS Code, atau:

```
npx serve .
```

Membuka `index.html` langsung dengan klik dua kali tetap bisa, tetapi pengecekan file PDF tidak berjalan, jadi tombol Slide, SKPL, dan Panduan Pengguna tidak muncul.

## Deploy ke Vercel

1. Unggah folder ini ke repository GitHub.
2. Di vercel.com pilih Add New, Project, lalu import repository tersebut.
3. Framework Preset: Other. Build Command dan Output Directory dikosongkan.
4. Klik Deploy. Setiap ada perubahan yang di-push ke GitHub, Vercel memperbarui website otomatis.

Alternatif tanpa GitHub: jalankan `npx vercel` di folder ini.

## Fitur halaman

- Tombol Tampilan: **Kartu** (ringkas, klik kartu untuk membuka panel detail) dan **Lengkap** (semua kelompok tampil berurutan). Pilihan terakhir pengunjung diingat di browser.
- Saring berdasarkan jenjang (SD, SMP, SMA, SMK), otomatis mengikuti jenjang yang ada di data.
- Tautan langsung ke satu proyek, misalnya `https://alamat-website/#k07`. Tampilan bisa dipaksa lewat `?tampilan=lengkap`.
- Video YouTube baru dimuat setelah tombol putar diklik supaya halaman tetap ringan.
