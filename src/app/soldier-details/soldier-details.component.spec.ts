import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldierDetailsComponent } from './soldier-details.component';

describe('SoldierDetailsComponent', () => {
  let component: SoldierDetailsComponent;
  let fixture: ComponentFixture<SoldierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldierDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
