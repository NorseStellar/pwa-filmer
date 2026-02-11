import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Film } from '../filmer';

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './film-card.html',
  // styleUrl: './film-card.css',
  styleUrls: ['./film-card.css'],
})
export class FilmCardComponent {
  @Input({ required: true }) film!: Film;
  @Output() delete = new EventEmitter<string>();

  onDelete() {
    this.delete.emit(this.film._id);
  }
}
