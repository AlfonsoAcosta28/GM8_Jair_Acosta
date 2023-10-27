import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewMembersRoutingModule } from './new-members-routing.module';
import { NewMembersComponent } from './new-members.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    NewMembersComponent
  ],
  imports: [
    CommonModule,
    NewMembersRoutingModule,
    NgChartsModule 
  ]
})
export class NewMembersModule { }
