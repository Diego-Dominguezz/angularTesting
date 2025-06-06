// soldier.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface Soldier {
  id: number;
  name: string;
  rank: string;
  specializations: string[];
  joinDate: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SoldierService {
  private soldiers: Soldier[] = [
    { id: 1, name: 'John Doe', rank: 'Capitan', specializations: ['Francotirador'], joinDate: '2020-01-15', isActive: true },
    { id: 2, name: 'Jane Smith', rank: 'Teniente', specializations: ['Medico'], joinDate: '2019-03-10', isActive: true },
    { id: 3, name: 'Mike Johnson', rank: 'Sargento', specializations: ['Ingeniero'], joinDate: '2018-07-25', isActive: false },
  ];

  constructor(private http: HttpClient) {
  }

  getSoldiers(): Soldier[] {
    return this.soldiers;
  }

  getSoldierById(id: number): Soldier | undefined {
    return this.soldiers.find(soldier => soldier.id === id);
  }

  addSoldier(soldier: Soldier): void {
    soldier.id = this.soldiers.length + 1;
    this.soldiers.push(soldier);
  }

  updateSoldier(updatedSoldier: Soldier): void {
    const index = this.soldiers.findIndex(soldier => soldier.id === updatedSoldier.id);
    if (index !== -1) {
      this.soldiers[index] = updatedSoldier;
    }
  }

  deleteSoldier(id: number): void {
    this.soldiers = this.soldiers.filter(soldier => soldier.id !== id);
  }

  // Genera 3 soldados aleatorios usando la API
  generateRandomSoldiers() {
    return this.http.get<any>('https://randomuser.me/api/?results=3').pipe(
      map(response => response.results.map((user: any, idx: number) => ({
        id: this.soldiers.length + idx + 1,
        name: `${user.name.first} ${user.name.last}`,
        rank: 'Recluta',
        specializations: ['Infantería'],
        joinDate: user.registered.date.substring(0, 10),
        isActive: true
      })))
    );
  }

  addRandomSoldiers(): void {
    this.generateRandomSoldiers().subscribe(soldiers => {
      soldiers.forEach((soldier: Soldier) => this.addSoldier(soldier));
    });
  }
}
