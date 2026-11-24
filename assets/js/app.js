/* Showcase Tugas Besar IK300 Mobile Programming
 * Semua data dibaca dari data/proyek.js. File ini tidak perlu diubah untuk mengganti isi.
 */
(function () {
  'use strict';

  var SITUS = window.SITUS || {};
  var TANDAI = SITUS.tandaiKolomKosong !== false;
  var URUTAN_JENJANG = ['SD', 'SMP', 'SMA', 'SMK'];
  var KUNCI_TAMPILAN = 'showcase-ik300-tampilan';

  var el = {
    grid: document.getElementById('grid'),
    lengkap: document.getElementById('lengkap'),
    kosong: document.getElementById('kosong'),
    jumlah: document.getElementById('jumlah'),
    filter: document.getElementById('filter-jenjang'),
    dialog: document.getElementById('detail'),
    dialogIsi: document.getElementById('detail-isi'),
    tombolTampilan: Array.prototype.slice.call(document.querySelectorAll('[data-tampilan]'))
  };

  var proyek = (window.PROYEK || [])
    .filter(function (p) { return p && Number(p.kelompok) > 0; })
    .map(normalisasi)
    .sort(function (a, b) { return a.kelompok - b.kelompok; });

  var state = { tampilan: tampilanAwal(), jenjang: 'Semua' };
  var pemicuTerakhir = null;
  var hasilCek = {};

  /* ---------- Bantuan ---------- */

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function dua(n) { return n < 10 ? '0' + n : String(n); }
  function teks(v) { return typeof v === 'string' ? v.trim() : ''; }

  function normalisasi(p) {
    var n = Number(p.kelompok);
    var kode = 'K' + dua(n);
    var dasar = 'assets/proyek/' + kode + '/';
    var t = p.tautan || {};
    var alur = Array.isArray(p.alurPenggunaan)
      ? p.alurPenggunaan.map(teks).filter(Boolean)
      : teks(p.alurPenggunaan);
    return {
      kelompok: n,
      kode: kode,
      id: kode.toLowerCase(),
      dasar: dasar,
      nama: teks(p.nama),
      jenjang: teks(p.jenjang).toUpperCase(),
      versi: teks(p.versi),
      deskripsi: teks(p.deskripsiSingkat),
      masalah: teks(p.masalahBelajar),
      tujuan: teks(p.tujuanPembelajaran),
      alur: alur,
      fitur: (p.fitur || []).map(function (f, i) {
        f = f || {};
        return {
          nama: teks(f.nama),
          penjelasan: teks(f.penjelasan),
          gambar: teks(f.gambar) || dasar + kode + '_ss' + dua(i + 1) + '.png'
        };
      }),
      anggota: (p.anggota || []).filter(function (a) { return a && teks(a.nama); })
        .map(function (a) { return { nama: teks(a.nama), peran: teks(a.peran) }; }),
      teknologi: teks(p.teknologi),
      kebutuhan: teks(p.kebutuhanPerangkat),
      instalasi: teks(p.caraInstalasi),
      kontak: teks(p.kontak),
      logo: teks(p.logo) || dasar + kode + '_logo.png',
      apk: teks(t.apk),
      github: teks(t.github),
      video: teks(t.video),
      berkas: [
        { label: 'Slide', url: teks(t.slide), bawaan: dasar + kode + '_Slide.pdf' },
        { label: 'SKPL', url: teks(t.skpl), bawaan: dasar + kode + '_SKPL.pdf' },
        { label: 'Panduan Pengguna', url: teks(t.panduan), bawaan: dasar + kode + '_PanduanPengguna.pdf' }
      ]
    };
  }

  function tampilanAwal() {
    var dariUrl = new URLSearchParams(location.search).get('tampilan');
    if (dariUrl === 'kartu' || dariUrl === 'lengkap') return dariUrl;
    try {
      var tersimpan = localStorage.getItem(KUNCI_TAMPILAN);
      if (tersimpan === 'kartu' || tersimpan === 'lengkap') return tersimpan;
    } catch (e) { /* penyimpanan tidak tersedia */ }
    return SITUS.tampilanAwal === 'lengkap' ? 'lengkap' : 'kartu';
  }

  function simpanTampilan(v) {
    try { localStorage.setItem(KUNCI_TAMPILAN, v); } catch (e) { /* abaikan */ }
  }

  function gambar(src, teksPengganti, alt) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt || '') + '" loading="lazy" data-ph="' + esc(teksPengganti) + '">';
  }

  function ph(isiTeks) { return '<span class="ph">' + esc(isiTeks) + '</span>'; }

  function namaAplikasi(p) {
    if (p.nama) return esc(p.nama);
    return TANDAI ? ph('Nama aplikasi belum diisi') : 'Kelompok ' + p.kelompok;
  }

  function tautkan(v) {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return '<a href="mailto:' + esc(v) + '">' + esc(v) + '</a>';
    if (/^https?:\/\//i.test(v)) return '<a href="' + esc(v) + '" target="_blank" rel="noopener">' + esc(v) + '</a>';
    return esc(v);
  }

  var IKON = {
    panah: '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5"/></svg>',
    unduh: '<svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10"/></svg>',
    putar: '<svg aria-hidden="true" width="22" height="22" viewBox="0 0 16 16" fill="#151A33"><path d="M5 3.2v9.6L13 8z"/></svg>'
  };

  /* ---------- Kartu ---------- */

  function kartu(p) {
    var layar = p.fitur.length ? p.fitur[0].gambar : p.dasar + p.kode + '_ss01.png';
    var desk = p.deskripsi ? esc(p.deskripsi) : (TANDAI ? ph('Deskripsi singkat belum diisi') : '');
    return '' +
      '<button type="button" class="card" data-buka="' + p.id + '">' +
        '<span class="card__media" aria-hidden="true"><span class="card__phone"><span class="card__screen">' +
          gambar(layar, p.kode + '_ss01', '') +
        '</span></span></span>' +
        '<span class="card__body">' +
          '<span class="meta"><span class="meta__group">Kelompok ' + p.kelompok + '</span>' +
            (p.jenjang ? '<span class="tag">' + esc(p.jenjang) + '</span>' : '') + '</span>' +
          '<span class="card__name">' + namaAplikasi(p) + '</span>' +
          (desk ? '<span class="card__desc">' + desk + '</span>' : '') +
          '<span class="card__more">Lihat detail ' + IKON.panah + '</span>' +
        '</span>' +
      '</button>';
  }

  /* ---------- Bagian proyek (tampilan lengkap dan panel detail) ---------- */

  function tombolTautan(p) {
    var out = [];
    if (p.apk) {
      out.push('<a class="btn btn--primary" href="' + esc(p.apk) + '" target="_blank" rel="noopener">' + IKON.unduh + 'Unduh APK</a>');
    } else if (TANDAI) {
      out.push('<span class="btn btn--primary is-disabled" aria-disabled="true">' + IKON.unduh + 'APK belum ada</span>');
    }
    if (p.github) {
      out.push('<a class="btn" href="' + esc(p.github) + '" target="_blank" rel="noopener">GitHub</a>');
    } else if (TANDAI) {
      out.push('<span class="btn is-disabled" aria-disabled="true">GitHub</span>');
    }
    p.berkas.forEach(function (b) {
      if (b.url) {
        out.push('<a class="btn" href="' + esc(b.url) + '" target="_blank" rel="noopener">' + esc(b.label) + '</a>');
      } else {
        // File bawaan di folder kelompok: tombol muncul setelah file dipastikan ada.
        out.push('<a class="btn" href="' + esc(b.bawaan) + '" target="_blank" rel="noopener" data-cek hidden>' + esc(b.label) + '</a>');
      }
    });
    return out.join('');
  }

  function idVideo(url) {
    var m = url.match(/(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/);
    if (m) return { jenis: 'yt', id: m[1] };
    var d = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([A-Za-z0-9_-]+)/);
    if (d) return { jenis: 'drive', id: d[1] };
    return null;
  }

  function video(p) {
    if (!p.video) {
      return TANDAI ? '<div class="video"><div class="video__empty">Video demo belum tersedia</div></div>' : '';
    }
    var v = idVideo(p.video);
    var label = 'Putar video demo ' + (p.nama || 'Kelompok ' + p.kelompok);
    if (v && v.jenis === 'yt') {
      return '<div class="video"><button type="button" class="video__play" data-yt="' + v.id + '" aria-label="' + esc(label) + '">' +
        '<img src="https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg" alt="" loading="lazy" data-sembunyi>' +
        '<span class="video__icon">' + IKON.putar + '</span><span class="video__label">Video demo</span></button></div>';
    }
    if (v && v.jenis === 'drive') {
      return '<div class="video"><button type="button" class="video__play" data-drive="' + v.id + '" aria-label="' + esc(label) + '">' +
        '<span class="video__icon">' + IKON.putar + '</span><span class="video__label">Video demo</span></button></div>';
    }
    return '<div class="video"><a class="video__play" href="' + esc(p.video) + '" target="_blank" rel="noopener">' +
      '<span class="video__icon">' + IKON.putar + '</span><span class="video__label">Buka video demo</span></a></div>';
  }

  function tangkapanLayar(p) {
    var daftar = p.fitur;
    if (!daftar.length) {
      if (!TANDAI) return '';
      daftar = [1, 2, 3].map(function (i) {
        return { nama: '', penjelasan: '', gambar: p.dasar + p.kode + '_ss' + dua(i) + '.png' };
      });
    }
    return '<div class="shots">' + daftar.map(function (f, i) {
      var nomor = p.kode + '_ss' + dua(i + 1);
      var judul = f.nama ? '<strong class="shot__title">' + esc(f.nama) + '</strong>'
        : (TANDAI ? '<strong class="shot__title ph">Nama fitur</strong>' : '');
      var desk = f.penjelasan ? '<span class="shot__desc">' + esc(f.penjelasan) + '</span>'
        : (TANDAI ? '<span class="shot__desc ph">Penjelasan singkat</span>' : '');
      return '<figure class="shot"><div class="shot__phone"><div class="shot__screen">' +
        gambar(f.gambar, nomor, 'Tangkapan layar ' + (f.nama || 'fitur ' + (i + 1))) +
        '</div></div><figcaption>' + judul + desk + '</figcaption></figure>';
    }).join('') + '</div>';
  }

  function blok(judul, nilai) {
    if (!nilai && !TANDAI) return '';
    return '<div class="block"><h4>' + judul + '</h4>' +
      (nilai ? '<p>' + esc(nilai) + '</p>' : '<p class="ph">Belum diisi</p>') + '</div>';
  }

  function blokAlur(p) {
    if (Array.isArray(p.alur) && p.alur.length) {
      return '<div class="block"><h4>Alur penggunaan</h4><ol class="steps">' +
        p.alur.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></div>';
    }
    return blok('Alur penggunaan', typeof p.alur === 'string' ? p.alur : '');
  }

  function blokAnggota(p) {
    if (!p.anggota.length && !TANDAI) return '';
    var isi = p.anggota.length
      ? p.anggota.map(function (a) {
          return '<li><span class="rows__main">' + esc(a.nama) + '</span>' +
            (a.peran ? '<span class="rows__sub">' + esc(a.peran) + '</span>'
              : (TANDAI ? '<span class="rows__sub ph">Peran belum diisi</span>' : '')) + '</li>';
        }).join('')
      : '<li><span class="rows__main ph">Belum diisi</span></li>';
    return '<div class="block"><h4>Anggota</h4><ul class="rows">' + isi + '</ul></div>';
  }

  function blokInfo(p) {
    var baris = [
      ['Teknologi', p.teknologi],
      ['Kebutuhan perangkat', p.kebutuhan],
      ['Cara instalasi', p.instalasi],
      ['Kontak', p.kontak]
    ].filter(function (r) { return r[1] || TANDAI; });
    if (!baris.length) return '';
    return '<div class="block"><h4>Informasi tambahan</h4><dl class="rows">' + baris.map(function (r) {
      return '<div><dt>' + r[0] + '</dt>' + (r[1] ? '<dd>' + tautkan(r[1]) + '</dd>' : '<dd class="ph">Belum diisi</dd>') + '</div>';
    }).join('') + '</dl></div>';
  }

  function bagian(p, dalamPanel) {
    var idJudul = (dalamPanel ? 'detail-' : 'judul-') + p.id;
    var desk = p.deskripsi ? esc(p.deskripsi) : (TANDAI ? ph('Deskripsi singkat belum diisi') : '');
    var anggotaInfo = blokAnggota(p) + blokInfo(p);
    return '' +
      '<section class="project"' + (dalamPanel ? '' : ' id="' + p.id + '"') + ' aria-labelledby="' + idJudul + '">' +
        '<div class="project__head">' +
          '<div class="project__id">' +
            '<span class="project__logo">' + gambar(p.logo, 'Logo', 'Logo ' + (p.nama || 'Kelompok ' + p.kelompok)) + '</span>' +
            '<div class="project__titles">' +
              '<div class="meta"><span class="meta__group">Kelompok ' + p.kelompok + '</span>' +
                (p.jenjang ? '<span class="tag">' + esc(p.jenjang) + '</span>' : '') +
                (p.versi ? '<span class="meta__version">Versi ' + esc(p.versi) + '</span>' : '') +
              '</div>' +
              '<h3 class="project__name" id="' + idJudul + '">' + namaAplikasi(p) + '</h3>' +
              (desk ? '<p class="project__desc">' + desk + '</p>' : '') +
            '</div>' +
          '</div>' +
          '<div class="project__actions">' + tombolTautan(p) + '</div>' +
        '</div>' +
        '<div class="project__body">' +
          '<div class="project__col">' + video(p) + tangkapanLayar(p) + '</div>' +
          '<div class="project__col">' +
            blok('Masalah belajar', p.masalah) +
            blok('Tujuan pembelajaran', p.tujuan) +
            blokAlur(p) +
            (anggotaInfo ? '<div class="split">' + anggotaInfo + '</div>' : '') +
          '</div>' +
        '</div>' +
      '</section>';
  }

  function indeks(daftar) {
    return '<nav class="index" aria-label="Lompat ke kelompok">' +
      '<p class="muted">Pilih nama aplikasi untuk langsung menuju bagiannya.</p>' +
      '<ol class="index__list">' + daftar.map(function (p) {
        return '<li><a class="index__link" href="#' + p.id + '">' +
          '<span class="index__text"><span class="meta__group">Kelompok ' + p.kelompok + '</span>' +
          '<span class="index__name">' + namaAplikasi(p) + '</span></span>' +
          (p.jenjang ? '<span class="tag">' + esc(p.jenjang) + '</span>' : '') +
          '</a></li>';
      }).join('') + '</ol></nav>';
  }

  /* ---------- Cek file PDF bawaan ---------- */

  function cekAda(url) {
    if (!hasilCek[url]) {
      hasilCek[url] = fetch(url, { method: 'HEAD', cache: 'no-cache' })
        .then(function (r) {
          var jenis = (r.headers.get('content-type') || '').toLowerCase();
          return r.ok && jenis.indexOf('text/html') === -1;
        })
        .catch(function () { return false; });
    }
    return hasilCek[url];
  }

  function periksaBerkas(wadah) {
    Array.prototype.forEach.call(wadah.querySelectorAll('[data-cek]'), function (a) {
      cekAda(a.getAttribute('href')).then(function (ada) {
        if (ada) {
          a.hidden = false;
        } else if (TANDAI) {
          a.removeAttribute('href');
          a.removeAttribute('target');
          a.classList.add('is-disabled');
          a.setAttribute('aria-disabled', 'true');
          a.hidden = false;
        }
        a.removeAttribute('data-cek');
      });
    });
  }

  /* ---------- Tampilkan ---------- */

  function daftarJenjang() {
    var ada = [];
    proyek.forEach(function (p) {
      if (p.jenjang && ada.indexOf(p.jenjang) === -1) ada.push(p.jenjang);
    });
    ada.sort(function (a, b) {
      var ia = URUTAN_JENJANG.indexOf(a), ib = URUTAN_JENJANG.indexOf(b);
      return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b);
    });
    return ['Semua'].concat(ada);
  }

  function buatFilter() {
    el.filter.innerHTML = daftarJenjang().map(function (j) {
      return '<button type="button" class="chip" data-jenjang="' + esc(j) + '" aria-pressed="' + (j === state.jenjang) + '">' + esc(j) + '</button>';
    }).join('');
  }

  function tampilkan() {
    var daftar = proyek.filter(function (p) {
      return state.jenjang === 'Semua' || p.jenjang === state.jenjang;
    });

    el.jumlah.textContent = daftar.length + ' proyek ' +
      (state.jenjang === 'Semua' ? 'dari seluruh kelompok' : 'untuk jenjang ' + state.jenjang);
    el.kosong.hidden = daftar.length > 0;

    el.tombolTampilan.forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-tampilan') === state.tampilan));
    });
    Array.prototype.forEach.call(el.filter.querySelectorAll('[data-jenjang]'), function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-jenjang') === state.jenjang));
    });

    if (state.tampilan === 'kartu') {
      el.lengkap.hidden = true;
      el.lengkap.innerHTML = '';
      el.grid.hidden = !daftar.length;
      el.grid.innerHTML = daftar.map(kartu).join('');
    } else {
      el.grid.hidden = true;
      el.grid.innerHTML = '';
      el.lengkap.hidden = !daftar.length;
      el.lengkap.innerHTML = daftar.length ? indeks(daftar) + daftar.map(function (p) { return bagian(p, false); }).join('') : '';
      periksaBerkas(el.lengkap);
    }
  }

  function aturTampilan(v) {
    if (v !== 'kartu' && v !== 'lengkap') return;
    state.tampilan = v;
    simpanTampilan(v);
    if (el.dialog.open) el.dialog.close();
    tampilkan();
  }

  /* ---------- Panel detail ---------- */

  function cariProyek(id) {
    for (var i = 0; i < proyek.length; i++) if (proyek[i].id === id) return proyek[i];
    return null;
  }

  function bukaDetail(id, pemicu, ubahHash) {
    var p = cariProyek(id);
    if (!p) return;
    el.dialogIsi.innerHTML = bagian(p, true);
    el.dialog.setAttribute('aria-labelledby', 'detail-' + p.id);
    el.dialog.removeAttribute('aria-label');
    pemicuTerakhir = pemicu || null;
    if (!el.dialog.open) {
      if (typeof el.dialog.showModal === 'function') el.dialog.showModal();
      else el.dialog.setAttribute('open', '');
    }
    document.documentElement.classList.add('modal-open');
    el.dialogIsi.scrollTop = 0;
    periksaBerkas(el.dialogIsi);
    if (ubahHash !== false && location.hash !== '#' + p.id) {
      history.replaceState(null, '', '#' + p.id);
    }
  }

  function setelahTutup() {
    el.dialogIsi.innerHTML = '';
    document.documentElement.classList.remove('modal-open');
    if (cariProyek(location.hash.slice(1).toLowerCase())) {
      history.replaceState(null, '', location.pathname + location.search);
    }
    if (pemicuTerakhir && document.body.contains(pemicuTerakhir)) pemicuTerakhir.focus();
    pemicuTerakhir = null;
  }

  function tutupDetail() {
    if (typeof el.dialog.close === 'function') el.dialog.close();
    else { el.dialog.removeAttribute('open'); setelahTutup(); }
  }

  function ikutiHash() {
    var id = decodeURIComponent(location.hash.slice(1)).toLowerCase();
    var p = cariProyek(id);
    if (!p) return;
    if (state.jenjang !== 'Semua' && p.jenjang !== state.jenjang) {
      state.jenjang = 'Semua';
      tampilkan();
    }
    if (state.tampilan === 'kartu') {
      var pemicu = el.grid.querySelector('[data-buka="' + p.id + '"]');
      bukaDetail(p.id, pemicu, false);
    } else {
      var bagianEl = document.getElementById(p.id);
      if (bagianEl) bagianEl.scrollIntoView();
    }
  }

  function putarVideo(tombol) {
    var wadah = tombol.closest('.video');
    var judul = tombol.getAttribute('aria-label') || 'Video demo';
    var iframe = document.createElement('iframe');
    if (tombol.hasAttribute('data-yt')) {
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + tombol.getAttribute('data-yt') + '?autoplay=1&rel=0';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    } else {
      iframe.src = 'https://drive.google.com/file/d/' + tombol.getAttribute('data-drive') + '/preview';
      iframe.allow = 'autoplay';
    }
    iframe.title = judul.replace(/^Putar /, '');
    iframe.setAttribute('allowfullscreen', '');
    wadah.innerHTML = '';
    wadah.appendChild(iframe);
  }

  /* ---------- Event ---------- */

  document.addEventListener('error', function (e) {
    var t = e.target;
    if (!t || t.tagName !== 'IMG') return;
    if (t.hasAttribute('data-sembunyi')) { t.remove(); return; }
    if (!t.hasAttribute('data-ph')) return;
    var wadahLogo = t.closest('.project__logo');
    if (wadahLogo && !TANDAI) { wadahLogo.remove(); return; }
    var pengganti = document.createElement('span');
    pengganti.className = 'ph-box';
    pengganti.textContent = TANDAI ? t.getAttribute('data-ph') : '';
    t.replaceWith(pengganti);
  }, true);

  el.tombolTampilan.forEach(function (b) {
    b.addEventListener('click', function () { aturTampilan(b.getAttribute('data-tampilan')); });
  });

  el.filter.addEventListener('click', function (e) {
    var b = e.target.closest('[data-jenjang]');
    if (!b) return;
    state.jenjang = b.getAttribute('data-jenjang');
    tampilkan();
  });

  el.grid.addEventListener('click', function (e) {
    var b = e.target.closest('[data-buka]');
    if (b) bukaDetail(b.getAttribute('data-buka'), b, true);
  });

  document.addEventListener('click', function (e) {
    var v = e.target.closest('[data-yt], [data-drive]');
    if (v) putarVideo(v);
  });

  el.dialog.addEventListener('click', function (e) {
    if (e.target.closest('[data-tutup]') || e.target === el.dialog) tutupDetail();
  });
  el.dialog.addEventListener('close', setelahTutup);

  window.addEventListener('hashchange', ikutiHash);

  /* ---------- Mulai ---------- */

  Array.prototype.forEach.call(document.querySelectorAll('[data-isi]'), function (n) {
    var v = SITUS[n.getAttribute('data-isi')];
    if (typeof v === 'string' && v.trim()) n.textContent = v.trim();
  });
  if (SITUS.mataKuliah && SITUS.kelas) {
    document.title = 'Showcase ' + (SITUS.judulKecil || 'Tugas Besar') + ' ' + SITUS.mataKuliah + ' ' + SITUS.kelas;
  }

  buatFilter();
  tampilkan();
  ikutiHash();
})();
