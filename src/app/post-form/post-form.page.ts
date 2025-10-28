// src/app/post-form/post-form.page.ts
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.services';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.page.html',
  styleUrls: ['./post-form.page.scss'],
})
export class PostFormPage implements OnInit {
  form: FormGroup;
  id: any = null;
  isEdit = false;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.isEdit = true;
      this.loadPost();
    }
  }

  async loadPost() {
    const loading = await this.loadingCtrl.create({ message: 'Memuat data...' });
    await loading.present();
    try {
      const post = await this.api.getPost(this.id);
      if (post) {
        this.form.patchValue({ title: post.title, content: post.content });
      }
    } catch (err) {
      console.error(err);
    } finally {
      loading.dismiss();
    }
  }

  async submit() {
    if (this.form.invalid) {
      const alert = await this.alertCtrl.create({ header: 'Validasi', message: 'Semua field harus diisi', buttons: ['OK'] });
      await alert.present();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: this.isEdit ? 'Menyimpan perubahan...' : 'Menyimpan...' });
    await loading.present();

    try {
      if (this.isEdit) {
        await this.api.updatePost(this.id, this.form.value);
      } else {
        await this.api.createPost(this.form.value);
      }
      await loading.dismiss();
      this.router.navigateByUrl('/', { replaceUrl: true });
    } catch (err) {
      await loading.dismiss();
      console.error(err);
      const alert = await this.alertCtrl.create({ header: 'Error', message: 'Gagal menyimpan', buttons: ['OK'] });
      await alert.present();
    }
  }
}
