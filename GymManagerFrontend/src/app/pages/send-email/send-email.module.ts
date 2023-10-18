import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendEmailRoutingModule } from './send-email-routing.module';
import { SendEmailComponent } from './send-email.component';

import { MaterialModule } from 'src/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SendEmailComponent
  ],
  imports: [
    CommonModule,
    SendEmailRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SendEmailModule { }
