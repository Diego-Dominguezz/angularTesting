import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldierFormComponent } from './soldier-form.component';

describe('SoldierFormComponent', () => {
  let component: SoldierFormComponent;
  let fixture: ComponentFixture<SoldierFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldierFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
