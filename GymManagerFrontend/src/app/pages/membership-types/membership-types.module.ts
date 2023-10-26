import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipTypesRoutingModule } from './membership-types-routing.module';
import { MembershipTypesComponent } from './membership-types.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material.module';
import { EditMemberShipTypesModule } from 'src/app/components/edit-member-ship-types/edit-member-ship-types.module';
import { DeleteElementModule } from 'src/app/components/delete-element/delete-element.module';


@NgModule({
  declarations: [
    MembershipTypesComponent
  ],
  imports: [
    CommonModule,
    MembershipTypesRoutingModule,
    MaterialModule,
    FormsModule,
    EditMemberShipTypesModule,
    DeleteElementModule
  ]
})
export class MembershipTypesModule { }
