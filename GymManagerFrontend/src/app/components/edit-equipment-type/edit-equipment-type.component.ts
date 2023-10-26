import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { EquipamentType } from 'src/app/core/interfaces/equipament-type';
import { EquipamentTypeService } from 'src/app/core/services/equipament-type.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-edit-equipment-type',
  templateUrl: './edit-equipment-type.component.html',
  styleUrls: ['./edit-equipment-type.component.scss']
})
export class EditEquipmentTypeComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private _service: EquipamentTypeService,
    private alertS: SwalAlertService
  ) {}

  @Input() row?: EquipamentType;
  @Input() confirmButtonText = 'Add Equipment Types';
  @Output() closeModalEvent: EventEmitter<Object> = new EventEmitter<Object>();
  myModal!: bootstrap.Modal;
  form!: FormGroup;
  defaultFields = {
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  };

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(
      <HTMLInputElement>document.getElementById('staticBackdrop')
    );
    this.myModal.show();
    this.form = this.fb.group(this.defaultFields);
    if (!!this.row) {
      this.confirmButtonText = 'Update Equipment Types';
      this.form.patchValue(this.row);
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
    const response = this.form.value;
  
    if (!!this.row && this.row.id !== undefined) {
      this.updateMembership(response, this.row);
    } else {
      this.addMembership(response);
    }
  }
  
  private updateMembership(response: any, row: any) {
    this._service.update(response, row.id).subscribe(
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
  
    this._service.add(response).subscribe(
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
