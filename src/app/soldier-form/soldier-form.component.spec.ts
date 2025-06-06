import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { SoldierFormComponent } from './soldier-form.component';
import { SoldierService } from '../soldier.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('SoldierFormComponent', () => {
  let component: SoldierFormComponent;
  let fixture: ComponentFixture<SoldierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldierFormComponent ],
      imports: [ FormsModule ],
      providers: [
        SoldierService,
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
