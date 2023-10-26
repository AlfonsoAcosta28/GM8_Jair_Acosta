import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { CitiesRoutingModule } from './cities-routing.module';
import { EditCityModule } from 'src/app/components/edit-city/edit-city.module';
import { CitiesComponent } from './cities.component';
import { DeleteElementModule } from 'src/app/components/delete-element/delete-element.module';



@NgModule({
  declarations: [
    CitiesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    CitiesRoutingModule,
    EditCityModule,
    DeleteElementModule
  ]
})
export class CitiesModule { }
