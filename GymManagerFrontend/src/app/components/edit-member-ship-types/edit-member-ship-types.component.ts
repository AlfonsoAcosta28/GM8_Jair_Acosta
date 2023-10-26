import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MembershipTypes } from 'src/app/core/interfaces/membership-types';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-edit-member-ship-types',
  templateUrl: './edit-member-ship-types.component.html',
  styleUrls: ['./edit-member-ship-types.component.scss'],
})
export class EditMemberShipTypesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _service: MembershipTypesService,
    private alertS: SwalAlertService
  ) {}

  @Input() row?: MembershipTypes;
  @Input() confirmButtonText = 'Add Membership Types';
  @Output() closeModalEvent: EventEmitter<Object> = new EventEmitter<Object>();
  myModal!: bootstrap.Modal;
  formUser!: FormGroup;
  defaultFields = {
    name: new FormControl('', Validators.required),
    cost: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required),
  };

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(
      <HTMLInputElement>document.getElementById('staticBackdrop')
    );
    this.myModal.show();
    this.formUser = this.fb.group(this.defaultFields);
    if (!!this.row) {
      this.confirmButtonText = 'Update Membership Types';
      this.formUser.patchValue(this.row);
    }
  }

  closeModal(refresh: boolean = false) {
    this.myModal.hide();
    let close = {
      closeModal: true,
      refreshData: refresh,
    };
    this.closeModalEvent.emit(close);
  }

  cancelForm(close: boolean) {
    if (close) {
      this.closeModal();
    }
  }

  responseForm() {
    const response = this.formUser.value;
  
    if (!!this.row && this.row.id !== undefined) {
      this.updateMembership(response, this.row);
    } else {
      this.addMembership(response);
    }
  }
  
  private updateMembership(response: any, row: any) {
    const element: MembershipTypes = {
      name: response.name,
      cost: response.cost,
      createdOn: row.createdOn,
      duration: response.duration
    };
  
    this._service.update(element, row.id).subscribe(
      (resp) => {
        if (!resp.hasError) {
          this.closeModal(true);
        } else {
          this.alertS.errorAlert(resp.message);
        }
      },(error) => {
        this.alertS.errorAlert('ERROR WHEN SENDING DATA');
      }
    );
  }
  
  private addMembership(response: any) {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
  
    const element: MembershipTypes = {
      name: response.name,
      cost: response.cost,
      createdOn: formattedDate,
      duration: response.duration
    };
  
    this._service.add(element).subscribe(
      (resp) => {
        if (!resp.hasError) {
          this.closeModal(true);
        } else {
          this.alertS.errorAlert(resp.message);
        }
      },
      (error) => {
        this.alertS.errorAlert('ERROR WHEN SENDING DATA');
      }
    );
  }
  
}
