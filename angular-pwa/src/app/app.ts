import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Filmer, Film } from './filmer';
import { FilmCardComponent } from './film-card/film-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, FilmCardComponent],
  templateUrl: './app.html',
  // styleUrl: './app.css',
  styleUrls: ['./app.css'],
})
export class App implements OnInit {
  protected readonly title = signal('angular-pwa');

  // Signal som håller filmerna.
  filmer = signal<Film[]>([]);

  constructor(private filmerService: Filmer) {}

  // Uppkoppling till MongoDB Atlas.
  ngOnInit(): void {
    this.filmerService.getFilmer().subscribe({
      next: (data) => {
        console.log('Filmlistan från MongoDb Atlas:', data);
        this.filmer.set(data);
      },
      error: (err) => {
        console.error('Filmerna kunde inte hämtas', err);
      },
    });
  }
  // Ta bort en film.
  deleteFilm(id: string) {
    this.filmerService.deleteFilm(id).subscribe(() => {
      this.filmer.update((filmer) => filmer.filter((f) => f._id !== id));
    });
  }

  // State för ny film.
  newFilm: Partial<Film> = {};

  // Lägga till film.
  addFilm() {
    this.filmerService.addFilm(this.newFilm).subscribe((film) => {
      this.filmer.update((filmer) => [...filmer, film]);
      this.newFilm = {};
    });
  }
}
