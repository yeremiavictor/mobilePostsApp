// src/app/post-detail/post-detail.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.services';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
  standalone: true, // ✅ tambahkan jika proyek standalone
  imports: [ /* tambahkan modul yang dipakai di template, misal: CommonModule, IonicModule */ ]
})
export class PostDetailPage implements OnInit {
  post: any = null;
  id: any;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.load();
  }

  async load() {
    const loading = await this.loadingCtrl.create({ message: 'Memuat...' });
    await loading.present();
    try {
      this.post = await this.api.getPost(this.id);
    } catch (err) {
      console.error(err);
    } finally {
      loading.dismiss();
    }
  }
}
