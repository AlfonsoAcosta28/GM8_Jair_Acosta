import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteElementModule } from 'src/app/components/delete-element/delete-element.module';
import { MaterialModule } from 'src/material.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CheckInModule } from 'src/app/components/check-in/check-in.module';


@NgModule({
  declarations: [
    AttendanceComponent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MaterialModule,
    DeleteElementModule,
    CheckInModule
  ],
  
})
export class AttendanceModule { }
