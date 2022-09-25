import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowsListComponent } from './borrows-list.component';

describe('BorrowsListComponent', () => {
  let component: BorrowsListComponent;
  let fixture: ComponentFixture<BorrowsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BorrowsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
