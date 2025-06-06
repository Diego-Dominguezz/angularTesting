// soldier-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoldierService, Soldier } from '../soldier.service';

@Component({
  selector: 'app-soldier-details',
  templateUrl: './soldier-details.component.html',
  styleUrls: ['./soldier-details.component.scss'] // <-- changed to .scss
})
export class SoldierDetailsComponent implements OnInit {
  soldier: Soldier | undefined;

  constructor(
    private soldierService: SoldierService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.soldier = this.soldierService.getSoldierById(+id);
    }
  }
}
