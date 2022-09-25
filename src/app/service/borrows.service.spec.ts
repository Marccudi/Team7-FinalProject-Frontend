import { TestBed } from '@angular/core/testing';

import { BorrowsService } from './borrows.service';

describe('BorrowsService', () => {
  let service: BorrowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorrowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
