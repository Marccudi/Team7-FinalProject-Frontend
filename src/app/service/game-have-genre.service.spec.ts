import { TestBed } from '@angular/core/testing';

import { GameHaveGenreService } from './game-have-genre.service';

describe('GameHaveGenreService', () => {
  let service: GameHaveGenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameHaveGenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
