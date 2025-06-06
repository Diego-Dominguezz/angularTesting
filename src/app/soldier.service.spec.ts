import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SoldierService } from './soldier.service';

describe('SoldierService', () => {
  let service: SoldierService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SoldierService]
    });
    service = TestBed.inject(SoldierService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test para verificar que se obtienen los soldados
  it('should test getSoldiers method', () => {
     expect(service.getSoldiers().length).toBeGreaterThan(1);
    });

  // test para verificar que se agrega un soldado
  it ('should add a soldier', () => {
    const newSoldier = {
      id: 0,
      name: 'New Soldier',
      rank: 'Recluta',
      specializations: ['Infantería'],
      joinDate: '2023-10-01',
      isActive: true
    };
    service.addSoldier(newSoldier);
    const soldiers = service.getSoldiers();
    expect(soldiers.length).toBeGreaterThan(0);
    expect(soldiers[soldiers.length - 1].name).toBe('New Soldier');
  });

  it('should update a soldier', () => {
    const updatedSoldier = {
      id: 1,
      name: 'Updated Soldier',
      rank: 'Capitán',
      specializations: ['Infantería'],
      joinDate: '2023-10-01',
      isActive: true
    };
    service.updateSoldier(updatedSoldier);
    const soldier = service.getSoldierById(1);
    expect(soldier).toBeDefined();
    expect(soldier?.name).toBe('Updated Soldier');
  });

  // test para eliminar un soldado
  it('should delete a soldier', () => {
    const initialLength = service.getSoldiers().length;
    service.deleteSoldier(1);
    const soldiers = service.getSoldiers();
    expect(soldiers.length).toBe(initialLength - 1);
    expect(soldiers.find(soldier => soldier.id === 1)).toBeUndefined();
  });

  // test para verificar que se obtiene un soldado por ID
  it('should get a soldier by ID', () => {
    const soldier = service.getSoldierById(1);
    expect(soldier).toBeDefined();
    expect(soldier?.name).toBe('John Doe'); // Asumiendo que el primer soldado se llama John Doe
  });

  // test para verificar que api mock devuelve 3 soldados
  it('should fetch 3 random soldiers from API', () => {
    service.generateRandomSoldiers().subscribe(soldiers => {
      expect(soldiers.length).toBe(3); // api solicita 3
      expect(soldiers[0].name).toBe('Andrea Pedersen');
    });

    // construmo la respuesta http esperada para la prueba
    const req = httpMock.expectOne('https://randomuser.me/api/?results=3');
    expect(req.request.method).toBe('GET');
    req.flush({
      results: [
        {
          name: { first: 'Andrea', last: 'Pedersen' },
          registered: { date: '2010-04-29T03:00:00.171Z' }
        },
        {
          name: { first: 'Juan', last: 'Pérez' },
          registered: { date: '2012-01-15T03:00:00.171Z' }
        },
        {
          name: { first: 'Maria', last: 'García' },
          registered: { date: '2015-07-20T03:00:00.171Z' }
        }
      ]
    });
  });

});
