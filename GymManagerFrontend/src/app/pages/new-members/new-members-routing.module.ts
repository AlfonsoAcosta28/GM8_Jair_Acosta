import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewMembersComponent } from './new-members.component';

const routes: Routes = [{path:'', component: NewMembersComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewMembersRoutingModule { }
