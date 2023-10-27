import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberAttendancesComponent } from './member-attendances.component';

const routes: Routes = [{path:'', component:MemberAttendancesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberAttendancesRoutingModule { }
