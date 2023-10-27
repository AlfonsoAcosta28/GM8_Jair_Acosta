import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberAttendancesRoutingModule } from './member-attendances-routing.module';
import { MemberAttendancesComponent } from './member-attendances.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    MemberAttendancesComponent
  ],
  imports: [
    CommonModule,
    MemberAttendancesRoutingModule,
    NgChartsModule 
  ]
})
export class MemberAttendancesModule { }
