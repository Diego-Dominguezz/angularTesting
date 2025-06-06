// soldier-list.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SoldierService, Soldier } from '../soldier.service';

@Component({
  selector: 'app-soldier-list',
  templateUrl: './soldier-list.component.html',
  styleUrls: ['./soldier-list.component.scss']
})
export class SoldierListComponent {
  soldiers: Soldier[] = [];

  constructor(private soldierService: SoldierService, private router: Router) {
    this.refresh();
  }

  refresh() {
    this.soldiers = this.soldierService.getSoldiers();
    this.soldierService.addRandomSoldiers();
  }

  viewDetails(id: number): void {
    this.router.navigate(['/details', id]);
  }

  editSoldier(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteSoldier(id: number): void {
    this.soldierService.deleteSoldier(id);
    this.refresh();
  }

  addSoldier(): void {
    this.router.navigate(['/add']);
  }
}
