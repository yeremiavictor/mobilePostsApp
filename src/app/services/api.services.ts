// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // sesuaikan baseUrl kalau backend di port/domain lain
  baseUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) {}

  async getPosts() {
    const obs = this.http.get<any>(`${this.baseUrl}`);
    const res = await firstValueFrom(obs);
    return res.data || [];
  }

  async getPost(id: number | string) {
    const obs = this.http.get<any>(`${this.baseUrl}/${id}`);
    const res = await firstValueFrom(obs);
    return res.data || null;
  }

  async createPost(payload: { title: string; content: string }) {
    const obs = this.http.post<any>(`${this.baseUrl}/store`, payload);
    return await firstValueFrom(obs);
  }

  async updatePost(id: number | string, payload: { title: string; content: string }) {
    const obs = this.http.patch<any>(`${this.baseUrl}/update/${id}`, payload);
    return await firstValueFrom(obs);
  }

  async deletePost(id: number | string) {
    const obs = this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
    return await firstValueFrom(obs);
  }
}
