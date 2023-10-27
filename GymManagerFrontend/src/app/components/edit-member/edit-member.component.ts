import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
// import * as bootstrap from 'bootstrap';
import { switchMap } from 'rxjs/operators';
import { Attendance } from 'src/app/core/interfaces/attendance';
import { City } from 'src/app/core/interfaces/city';
import { Member } from 'src/app/core/interfaces/member';
import { MembershipTypes } from 'src/app/core/interfaces/membership-types';
import { CitiesService } from 'src/app/core/services/cities.service';
import { MembersService } from 'src/app/core/services/members.service';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.scss'],
})
export class EditMemberComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private _service: MembersService,
    private alertS: SwalAlertService,
    private _servicesCity: CitiesService,
    private _serviceMembershipTypes: MembershipTypesService
  ) {}

  @Input() row?: Member;
  @Input() confirmButtonText = 'Add Member';
  @Output() closeModalEvent: EventEmitter<Object> = new EventEmitter<Object>();

  cities?: City[];
  membershipTypes?: MembershipTypes[]
  // myModal!: bootstrap.Modal;
  formUser!: FormGroup;
  defaultFields = {
    name: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    allowNewsLetter: new FormControl(false),
    cityId: new FormControl('', Validators.required),
    membershipTypeId: new FormControl('', Validators.required),
  };

  ngOnInit(): void {
    this._servicesCity.getAll().subscribe((response) => {
      this.cities = response.model;
    });
    
    this._serviceMembershipTypes.getAll().subscribe((response) => {
      this.membershipTypes = response.model;
    });

    this.loadForm();
  }

  loadForm() {
    console.log(this.row)
    this.formUser = this.fb.group(this.defaultFields);
    if (!!this.row) {
      this.confirmButtonText = 'Update Member';
      this.formUser.patchValue(this.row);
    }
  }
  close(refresh: boolean = false) {
    // this.myModal.hide();
    let close = {
      closeModal: true,
      refreshData: refresh,
    };
    this.closeModalEvent.emit(close);
  }

  cancelForm(close: boolean) {
    if (close) {
      this.close();
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
    this._service.update(response, row.id).subscribe(
      (resp) => {
        if (!resp.hasError) {
          this.close(true);
        } else {
          this.alertS.errorAlert(resp.message);
        }
      },
      (error) => {
        this.alertS.errorAlert('ERROR WHEN SENDING DATA');
      }
    );
  }

  private addMembership(response: any) {

    
    const model:Member = {
      name: response.name,
      lastName: response.lastName,
      birthDay: '2023-10-27T00:21:47.931Z',
      email: response.email,
      allowNewsLetter: response.allowNewsLetter,
      registeredOn: '2023-10-27T00:21:47.931Z',
      membershipEnd: '',
      cityId: response.cityId,
      membershipTypeId: response.membershipTypeId
    }

    console.log(response)
    this._service.add(model).subscribe(
      (resp) => {
        if (!resp.hasError) {
          this.close(true);
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
