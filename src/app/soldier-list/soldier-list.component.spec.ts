import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldierListComponent } from './soldier-list.component';

describe('SoldierListComponent', () => {
  let component: SoldierListComponent;
  let fixture: ComponentFixture<SoldierListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldierListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldierListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
