import { TestBed } from '@angular/core/testing';

import { OwnsService } from './owns.service';

describe('OwnsService', () => {
  let service: OwnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
