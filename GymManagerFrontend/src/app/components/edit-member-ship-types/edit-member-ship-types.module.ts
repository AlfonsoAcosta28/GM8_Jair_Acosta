import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditMemberShipTypesComponent } from './edit-member-ship-types.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [EditMemberShipTypesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[EditMemberShipTypesComponent]
})
export class EditMemberShipTypesModule { }
