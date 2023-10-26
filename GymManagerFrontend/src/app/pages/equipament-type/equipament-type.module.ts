import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EquipamentTypeRoutingModule } from './equipament-type-routing.module';
import { EquipamentTypeComponent } from './equipament-type.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { EditEquipmentTypeModule } from 'src/app/components/edit-equipment-type/edit-equipment-type.module';
import { DeleteElementModule } from 'src/app/components/delete-element/delete-element.module';


@NgModule({
  declarations: [
    EquipamentTypeComponent
  ],
  imports: [
    CommonModule,
    EquipamentTypeRoutingModule,
    MaterialModule,
    FormsModule, 
    EditEquipmentTypeModule,
    DeleteElementModule
  ],
  exports:[EquipamentTypeComponent]
})
export class EquipamentTypeModule { }
