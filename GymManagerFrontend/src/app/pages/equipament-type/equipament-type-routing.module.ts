import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipamentTypeComponent } from './equipament-type.component';

const routes: Routes = [{ path: '', component: EquipamentTypeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipamentTypeRoutingModule { }
