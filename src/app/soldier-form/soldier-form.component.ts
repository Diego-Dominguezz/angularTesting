// soldier-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldierService, Soldier } from '../soldier.service';

@Component({
  selector: 'app-soldier-form',
  templateUrl: './soldier-form.component.html',
  styleUrls: ['./soldier-form.component.scss']
})
export class SoldierFormComponent implements OnInit {
  soldier: Soldier = { id: 0, name: '', rank: '', specializations: [], joinDate: '', isActive: false };
  specializations: string = '';
  isEdit = false;

  constructor(
    private soldierService: SoldierService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const found = this.soldierService.getSoldierById(+id);
      if (found) {
        this.soldier = { ...found };
        this.specializations = this.soldier.specializations.join(', ');
        this.isEdit = true;
      }
    }
  }

  saveSoldier(): void {
    this.soldier.specializations = this.specializations.split(',').map(s => s.trim()).filter(s => s);
    if (this.isEdit) {
      this.soldierService.updateSoldier(this.soldier);
    } else {
      this.soldierService.addSoldier(this.soldier);
    }
    this.router.navigate(['/']);
  }
}
