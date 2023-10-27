import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { CheckInComponent } from './check-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from 'src/material.module';



@NgModule({
  declarations: [CheckInComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    MaterialModule
  ],
  exports:[CheckInComponent]
})
export class CheckInModule { }
