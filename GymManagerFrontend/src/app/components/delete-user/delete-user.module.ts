import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteUserComponent } from './delete-user.component';



@NgModule({
  declarations: [DeleteUserComponent],
  imports: [
    CommonModule
  ],
  exports:[DeleteUserComponent]
})
export class DeleteUserModule { }
