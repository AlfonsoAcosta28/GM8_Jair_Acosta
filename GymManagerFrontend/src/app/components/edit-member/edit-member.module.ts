import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { EditMemberComponent } from './edit-member.component';
import { DeleteElementComponent } from '../delete-element/delete-element.component';



@NgModule({
  declarations: [EditMemberComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ], 
  exports:[EditMemberComponent],
  providers:[]
})
export class EditMemberModule { }
