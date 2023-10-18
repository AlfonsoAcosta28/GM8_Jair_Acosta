import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicCardComponent } from './basic-card.component';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [
    BasicCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ], 
  exports: [
    BasicCardComponent
  ]
})
export class BasicCardModule { }
