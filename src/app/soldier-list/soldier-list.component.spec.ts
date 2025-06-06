import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SoldierListComponent } from './soldier-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldierService, Soldier } from '../soldier.service';

describe('SoldierListComponent', () => {
  let component: SoldierListComponent;
  let fixture: ComponentFixture<SoldierListComponent>;
  let mockSoldierService: jasmine.SpyObj<SoldierService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockSoldierService = jasmine.createSpyObj('SoldierService', [
      'getSoldiers',
      'addRandomSoldiers',
      'deleteSoldier'
    ]);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [SoldierListComponent],
      providers: [
        { provide: SoldierService, useValue: mockSoldierService },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SoldierListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getSoldiers and addRandomSoldiers on refresh', () => {
    mockSoldierService.getSoldiers.and.returnValue([]);
    component.refresh();
    expect(mockSoldierService.getSoldiers).toHaveBeenCalled();
    expect(mockSoldierService.addRandomSoldiers).toHaveBeenCalled();
  });

  it('should navigate to details on viewDetails', () => {
    component.viewDetails(5);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/details', 5]);
  });

  it('should navigate to edit on editSoldier', () => {
    component.editSoldier(2);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/edit', 2]);
  });

  it('should call deleteSoldier and refresh on deleteSoldier', () => {
    spyOn(component, 'refresh');
    component.deleteSoldier(3);
    expect(mockSoldierService.deleteSoldier).toHaveBeenCalledWith(3);
    expect(component.refresh).toHaveBeenCalled();
  });

  it('should navigate to add on addSoldier', () => {
    component.addSoldier();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/add']);
  });
});
