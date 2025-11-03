# 📱 mobilePostsApp – Aplikasi CRUD Sederhana dengan Ionic + Angular

Aplikasi mobile berbasis **Ionic Framework** dan **Angular** untuk mengelola postingan (CRUD: Create, Read, Update, Delete).  
Dibangun menggunakan pendekatan **standalone components** dan **Capacitor** untuk kompatibilitas lintas platform (Android, iOS, Web).

> ✅ **Tidak memerlukan emulator** – bisa dijalankan dan diuji langsung di browser!

---

## 🌟 Fitur Utama

- 📋 Menampilkan daftar postingan  
- ➕ Tambah postingan baru  
- ✏️ Edit postingan yang sudah ada  
- 🗑️ Hapus postingan  
- 👁️ Lihat detail postingan  
- 🔄 Tarik ke bawah untuk refresh data  
- 🌓 Dukungan tema terang/gelap otomatis  
- 🧪 Siap diuji di browser tanpa perangkat fisik  

---

## 🛠️ Teknologi yang Digunakan

- **Ionic Framework v8** – UI toolkit untuk aplikasi mobile  
  (Performa tinggi, gesture touch-optimized, transisi hardware-accelerated)
- **Angular v20** – Framework frontend modern
- **Capacitor v7** – Bridge native modern pengganti Cordova
- **Ionicons** – Koleksi ikon resmi dari Ionic
- **HttpClient** – Untuk komunikasi dengan REST API
- **Standalone Components** – Arsitektur Angular modern tanpa NgModule

> 💡 Ionic digunakan oleh perusahaan ternama seperti **Target**, **IBM**, **Southwest Airlines**, **T-Mobile**, dan **H&R Block**.

---

## 🚀 Instalasi & Menjalankan Aplikasi

### Prasyarat
- Node.js (https://nodejs.org) (versi 18 atau lebih baru)
- Terminal (Command Prompt, PowerShell, atau Terminal macOS/Linux)

### Langkah-Langkah

1. **Install Ionic CLI secara global**
   ```bash
   npm install -g @ionic/cli
   ```

2. **Masuk ke folder proyek**
   Jika Anda sudah memiliki kode ini:
   ```bash
   cd mobilePostsApp
   ```

3. **Install semua dependensi**
   ```bash
   npm install
   ```

4. **(Opsional) Siapkan Capacitor** – untuk deploy ke perangkat nanti
   ```bash
   npm install @capacitor/core @capacitor/cli
   npx cap init
   ```

5. **Jalankan di browser**
   ```bash
   ionic serve
   ```
   Aplikasi akan terbuka otomatis di `http://localhost:8100`

---

## 🔌 Integrasi Backend (REST API)

Aplikasi ini mengasumsikan adanya **backend REST API** yang berjalan di:

```
http://localhost:3000/api/posts
```

### Endpoint yang Diperlukan

| Aksi        | Metode | Endpoint                      |
|--------------|--------|-------------------------------|
| Ambil semua  | GET    | `/api/posts`                  |
| Ambil satu   | GET    | `/api/posts/:id`              |
| Tambah       | POST   | `/api/posts/store`            |
| Edit         | PATCH  | `/api/posts/update/:id`       |
| Hapus        | DELETE | `/api/posts/delete/:id`       |

> 🧪 **Tips untuk Mahasiswa**  
> Jika belum punya backend:
> - Gunakan **mock data** sementara di file `home.page.ts`
> - Atau buat fake API cepat dengan **JSON Server**:
>   ```bash
>   npx json-server --watch db.json --port 3000
>   ```

---

## 📂 Struktur Proyek Penting

```
src/
├── app/
│   ├── home/             → Halaman utama (daftar posts)
│   ├── post-detail/      → Tampilan detail postingan
│   ├── post-form/        → Form tambah/edit
│   └── services/
│       └── api.service.ts → Service HTTP untuk komunikasi API
├── app.component.ts      → Komponen root aplikasi
├── app.routes.ts         → Routing utama
└── main.ts               → Titik awal bootstrap aplikasi
```

---

## 📖 Catatan Penting untuk Pemula

- Semua kode **sudah lengkap dan siap jalan**.  
- Ikon seperti `add`, `trash`, `create`, dan `eye` **sudah diimpor di `main.ts`**.  
- Jika muncul error saat akses API, pastikan backend berjalan di `localhost:3000`.  
- Tampilan bisa diubah hanya dengan edit file `.html` dan `.scss`.  
- Tidak perlu paham semua kode sekaligus — cukup pelajari bagian per bagian.  

---

## 📦 Deployment ke Perangkat (Opsional)

Untuk coba di HP Android:

```bash
ionic build
npx cap add android
npx cap open android
```

Lalu build melalui **Android Studio**.

---

## 📚 Referensi Resmi

- [Dokumentasi Ionic](https://ionicframework.com/docs)
- [Dokumentasi Angular](https://angular.io)
- [Dokumentasi Capacitor](https://capacitorjs.com/docs)

---

## 🙌 Dibuat Untuk Pembelajaran

Proyek ini dirancang sebagai contoh aplikasi mobile sederhana untuk mahasiswa atau pemula yang ingin belajar:

- Membuat aplikasi mobile dengan teknologi web  
- Memahami konsep CRUD  
- Menggunakan framework modern (Ionic + Angular)  

> **Ionic = Satu kode. Banyak platform. Tanpa kompromi.**
