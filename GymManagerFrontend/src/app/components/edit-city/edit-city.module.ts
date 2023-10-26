import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCityComponent } from './edit-city.component';


@NgModule({
  declarations: [
    EditCityComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[EditCityComponent]
})
export class EditCityModule { }
