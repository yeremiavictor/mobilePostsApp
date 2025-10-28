// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'post-form',
    loadChildren: () => import('./post-form/post-form.page').then(m => m.PostFormPage)
  },
  {
    path: 'post-form/:id',
    loadChildren: () => import('./post-form/post-form.page').then(m => m.PostFormPage)
  },
  {
    path: 'post-detail/:id',
    loadChildren: () => import('./post-detail/post-detail.page').then(m => m.PostDetailPage)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
