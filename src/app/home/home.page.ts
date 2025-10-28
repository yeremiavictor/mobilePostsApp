// src/app/home/home.page.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class HomePage implements OnInit {

  posts: any[] = [];
  apiURL = 'http://localhost:3000/api/posts'; // ✅ Sesuaikan dengan endpoint backend Anda

  constructor(
    private http: HttpClient,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  trackByPostId(index: number, post: any): number {
  return post.id;
}

  loadPosts(event?: any) {
    this.http.get<any>(this.apiURL).subscribe({
      next: (res) => {
        // Fleksibel: terima { data: [...] } atau langsung [...]
        this.posts = res.data || res || [];
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error('Error saat memuat posts:', err);
        this.showToast('Gagal memuat data');
        if (event) event.target.complete();
      }
    });
  }

  async addPost() {
    const alert = await this.alertCtrl.create({
      header: 'Tambah Post',
      inputs: [
        { name: 'title', type: 'text', placeholder: 'Judul' },
        { name: 'content', type: 'textarea', placeholder: 'Isi konten' },
      ],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Simpan',
          handler: (data) => {
            if (data.title && data.content) {
              this.http.post(`${this.apiURL}/store`, data).subscribe({ // ✅ POST ke /api/posts (tanpa /store)
                next: () => {
                  this.showToast('Post berhasil ditambahkan');
                  this.loadPosts();
                },
                error: (err) => {
                  this.showToast('Gagal menambah data');
                }
              });
              return true;
            } else {
              this.showToast('Form tidak boleh kosong');
              return false;
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async editPost(post: any) {
    const alert = await this.alertCtrl.create({
      header: 'Edit Post',
      inputs: [
        { name: 'title', type: 'text', value: post.title },
        { name: 'content', type: 'textarea', value: post.content },
      ],
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Update',
          handler: (data) => {
            this.http.patch(`${this.apiURL}/update/${post.id}`, data).subscribe({ // ✅ PATCH ke /api/posts/1
              next: () => {
                this.showToast('Post berhasil diperbarui');
                this.loadPosts();
              },
              error: (err) => {
                console.error('Error update post:', err);
                this.showToast('Gagal update data');
              }
            });
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async confirmDelete(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Hapus Post?',
      message: 'Apakah Anda yakin ingin menghapus post ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Hapus',
          handler: () => {
            this.http.delete(`${this.apiURL}/delete/${id}`).subscribe({ // ✅ DELETE ke /api/posts/1
              next: () => {
                this.showToast('Post berhasil dihapus');
                this.loadPosts();
              },
              error: (err) => {
                console.error('Error delete post:', err);
                this.showToast('Gagal hapus data');
              }
            });
            return true;
          }
        }
      ]
    });
    await alert.present();
  }

  async viewDetail(post: any) {
    const alert = await this.alertCtrl.create({
      header: post.title,
      message: post.content,
      buttons: ['OK']
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
