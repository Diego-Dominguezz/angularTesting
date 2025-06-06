import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoldierFormComponent } from './soldier-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldierService } from '../soldier.service';
import { FormsModule } from '@angular/forms';

describe('SoldierFormComponent', () => {
  let component: SoldierFormComponent;
  let fixture: ComponentFixture<SoldierFormComponent>;
  let mockSoldierService: jasmine.SpyObj<SoldierService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSoldierService = jasmine.createSpyObj('SoldierService', [
      'getSoldierById',
      'addSoldier',
      'updateSoldier',
      'getSoldiers',
      'addRandomSoldiers'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SoldierFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: SoldierService, useValue: mockSoldierService },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SoldierFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not set isEdit if no id in route', () => {
    component.ngOnInit();
    expect(component.isEdit).toBeFalse();
  });

  it('should not set isEdit if id not found', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('99');
    mockSoldierService.getSoldierById.and.returnValue(undefined);

    component.ngOnInit();

    expect(component.isEdit).toBeFalse();
    expect(component.soldier.id).toBe(0);
  });

  it('should not set isEdit if id found but soldier does not exist', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('123');
    mockSoldierService.getSoldierById.and.returnValue(undefined);

    component.ngOnInit();

    expect(component.isEdit).toBeFalse();
    expect(component.soldier.id).toBe(0);
    expect(component.specializations).toBe('');
  });

  it('should set isEdit and fill data if id found', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('1');
    mockSoldierService.getSoldierById.and.returnValue({
      id: 1,
      name: 'Jane',
      rank: 'Teniente',
      specializations: ['Medico', 'Infantería'],
      joinDate: '2020-01-01',
      isActive: true
    });

    component.ngOnInit();

    expect(component.isEdit).toBeTrue();
    expect(component.soldier.id).toBe(1);
    expect(component.specializations).toBe('Medico, Infantería');
  });

  it('should call addSoldier and navigate on saveSoldier when not editing', () => {
    component.isEdit = false;
    component.soldier = { id: 0, name: 'New', rank: '', specializations: [], joinDate: '', isActive: true };
    component.specializations = 'Infantería, Médico';

    component.saveSoldier();

    expect(mockSoldierService.addSoldier).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should call updateSoldier and navigate on saveSoldier when editing', () => {
    component.isEdit = true;
    component.soldier = { id: 1, name: 'Edit', rank: '', specializations: [], joinDate: '', isActive: true };
    component.specializations = 'Francotirador';

    component.saveSoldier();

    expect(mockSoldierService.updateSoldier).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should handle empty specializations string on saveSoldier', () => {
    component.isEdit = false;
    component.soldier = { id: 0, name: 'NoSpec', rank: '', specializations: [], joinDate: '', isActive: true };
    component.specializations = '   ';

    component.saveSoldier();

    expect(component.soldier.specializations).toEqual([]);
    expect(mockSoldierService.addSoldier).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should trim and filter specializations on saveSoldier', () => {
    component.isEdit = false;
    component.soldier = { id: 0, name: 'TrimSpec', rank: '', specializations: [], joinDate: '', isActive: true };
    component.specializations = '  Infantería , , Médico  ,  ';

    component.saveSoldier();

    expect(component.soldier.specializations).toEqual(['Infantería', 'Médico']);
    expect(mockSoldierService.addSoldier).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });

});
