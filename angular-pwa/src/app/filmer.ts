import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Film {
  _id: string;
  titel: string;
  rating: string;
  filmid: string;
  ar: string;
  regissor: string;
  skadespelare: string;
  trailerUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class Filmer {
  private apiUrl = 'https://pwa-filmer-api.onrender.com/filmer';

  constructor(private http: HttpClient) {}

  getFilmer(): Observable<Film[]> {
    return this.http.get<Film[]>(this.apiUrl);
  }

  deleteFilm(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addFilm(film: Partial<Film>) {
    return this.http.post<Film>(this.apiUrl, film);
  }
}
