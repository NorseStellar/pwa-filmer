// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FilmCard } from './film-card';

// describe('FilmCard', () => {
//   let component: FilmCard;
//   let fixture: ComponentFixture<FilmCard>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [FilmCard],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FilmCard);
//     component = fixture.componentInstance;
//     await fixture.whenStable();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
//  Ny pga fel namn på komponent:
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmCardComponent } from './film-card';

describe('FilmCardComponent', () => {
  let component: FilmCardComponent;
  let fixture: ComponentFixture<FilmCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
