import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditEquipmentTypeComponent } from './edit-equipment-type.component';



@NgModule({
  declarations: [EditEquipmentTypeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[EditEquipmentTypeComponent]
})
export class EditEquipmentTypeModule { }
