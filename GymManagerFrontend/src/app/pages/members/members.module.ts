import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material.module';
import { FormsModule } from '@angular/forms';
import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { EditMemberModule } from 'src/app/components/edit-member/edit-member.module';
import { DeleteElementModule } from 'src/app/components/delete-element/delete-element.module';



@NgModule({
  declarations: [MembersComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule, 
    MembersRoutingModule,
    EditMemberModule,
    DeleteElementModule
  ],
  exports:[MembersComponent]
})
export class MembersModule { }
