// soldier.service.ts
import { Injectable } from '@angular/core';

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
}
