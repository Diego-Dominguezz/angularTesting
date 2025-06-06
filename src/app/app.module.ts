// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'; // <-- AGREGA ESTA LÍNEA
import { SoldierService } from './soldier.service';
import { SoldierListComponent } from './soldier-list/soldier-list.component';
import { SoldierFormComponent } from './soldier-form/soldier-form.component';
import { SoldierDetailsComponent } from './soldier-details/soldier-details.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    SoldierListComponent,
    SoldierFormComponent,
    SoldierDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, // <-- Y ESTA LÍNEA
    FormsModule,
    AppRoutingModule
  ],
  providers: [SoldierService],
  bootstrap: [AppComponent],
})
export class AppModule { }
