import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditorDComponent } from './user-editor.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { LoginFormModule } from '../../login-form/login-form.module';



@NgModule({
  declarations: [UserEditorDComponent],
  imports: [
    CommonModule,
    MaterialModule, 
    FormsModule,
    LoginFormModule
  ],
  exports:[UserEditorDComponent]
})
export class UserEditorDModule { }
