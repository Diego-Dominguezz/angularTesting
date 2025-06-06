// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoldierListComponent } from './soldier-list/soldier-list.component';
import { SoldierFormComponent } from './soldier-form/soldier-form.component';
import { SoldierDetailsComponent } from './soldier-details/soldier-details.component';

const routes: Routes = [
  { path: '', component: SoldierListComponent },
  { path: 'add', component: SoldierFormComponent },
  { path: 'edit/:id', component: SoldierFormComponent },
  { path: 'details/:id', component: SoldierDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
