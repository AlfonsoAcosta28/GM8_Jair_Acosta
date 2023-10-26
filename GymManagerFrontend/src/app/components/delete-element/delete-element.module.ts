import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteElementComponent } from './delete-element.component';



@NgModule({
  declarations: [DeleteElementComponent],
  imports: [
    CommonModule
  ],
  exports:[DeleteElementComponent]
})
export class DeleteElementModule { }
