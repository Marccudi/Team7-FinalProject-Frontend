import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGamesComponent } from './my-games.component';

describe('MyGamesComponent', () => {
  let component: MyGamesComponent;
  let fixture: ComponentFixture<MyGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGamesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
