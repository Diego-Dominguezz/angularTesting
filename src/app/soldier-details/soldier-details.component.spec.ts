import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldierDetailsComponent } from './soldier-details.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('SoldierDetailsComponent', () => {
  let component: SoldierDetailsComponent;
  let fixture: ComponentFixture<SoldierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SoldierDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        { provide: Router, useValue: { navigate: () => { } } }
      ],
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
