import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { UserEditorModule } from 'src/app/components/userEdior/user-editor/user-editor.module';
import { UserEditorDModule } from 'src/app/components/dialog/user-editor/user-editor.module';
import { BasicCardModule } from 'src/app/components/cards/basic-card/basic-card.module';
import { DeleteUserModule } from 'src/app/components/delete-user/delete-user.module';


@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule, 
    MaterialModule, 
    UserEditorModule,
    FormsModule,
    UserEditorModule,
    UserEditorDModule,
    BasicCardModule,
    DeleteUserModule
  ]
})
export class UsersModule { }
