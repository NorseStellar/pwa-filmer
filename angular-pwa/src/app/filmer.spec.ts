import { TestBed } from '@angular/core/testing';

import { Filmer } from './filmer';

describe('Filmer', () => {
  let service: Filmer;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Filmer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
