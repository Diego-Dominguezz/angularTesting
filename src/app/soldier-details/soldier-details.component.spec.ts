import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoldierDetailsComponent } from './soldier-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldierService, Soldier } from '../soldier.service';
import { of } from 'rxjs';

describe('SoldierDetailsComponent', () => {
  let component: SoldierDetailsComponent;
  let fixture: ComponentFixture<SoldierDetailsComponent>;
  let mockSoldierService: jasmine.SpyObj<SoldierService>;

  beforeEach(async () => {
    mockSoldierService = jasmine.createSpyObj('SoldierService', ['getSoldierById']);

    await TestBed.configureTestingModule({
      declarations: [SoldierDetailsComponent],
      providers: [
        { provide: SoldierService, useValue: mockSoldierService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: (key: string) => key === 'id' ? '1' : null } } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SoldierDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get soldier by id on init', () => {
    const mockSoldier: Soldier = {
      id: 1,
      name: 'Test Soldier',
      rank: 'Cabo',
      specializations: ['Infantería'],
      joinDate: '2020-01-01',
      isActive: true
    };
    mockSoldierService.getSoldierById.and.returnValue(mockSoldier);

    component.ngOnInit();

    expect(mockSoldierService.getSoldierById).toHaveBeenCalledWith(1);
    expect(component.soldier).toEqual(mockSoldier);
  });

  it('should not set soldier if id is not present', () => {
    // Simula que no hay id en la ruta
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);

    component.ngOnInit();

    expect(mockSoldierService.getSoldierById).not.toHaveBeenCalled();
    expect(component.soldier).toBeUndefined();
  });
});
