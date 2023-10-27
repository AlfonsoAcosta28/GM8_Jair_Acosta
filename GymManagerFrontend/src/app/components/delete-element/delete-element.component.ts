import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Attendance } from 'src/app/core/interfaces/attendance';
import { City } from 'src/app/core/interfaces/city';
import { EquipamentType } from 'src/app/core/interfaces/equipament-type';
import { Member } from 'src/app/core/interfaces/member';
import { MembershipTypes } from 'src/app/core/interfaces/membership-types';
import { ResponseModel } from 'src/app/core/interfaces/response-model';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { CitiesService } from 'src/app/core/services/cities.service';
import { EquipamentTypeService } from 'src/app/core/services/equipament-type.service';
import { MembersService } from 'src/app/core/services/members.service';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-delete-element',
  templateUrl: './delete-element.component.html',
  styleUrls: ['./delete-element.component.scss']
})
export class DeleteElementComponent {

  @Input() rowCity?: City;
  @Input() rowMembershipType?: MembershipTypes;
  @Input() rowMember?: Member
  @Input() rowEquipmentType?:EquipamentType
  @Input() rowAttendance?:Attendance
  @Output() closeModalEvent: EventEmitter<Object> = new EventEmitter<Object>()
  myModal!: bootstrap.Modal;

  row: any
  constructor(
    private _serviceCity: CitiesService,
    private _serviceMembershipType: MembershipTypesService,
    private alertS: SwalAlertService, 
    private _serviceMember: MembersService, 
    private _serviceEquipmentype: EquipamentTypeService, 
    private _serviceAttendance:AttendanceService){

  }
  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(<HTMLInputElement>document.getElementById('staticBackdrop'))
    this.myModal.show()
    if(this.rowCity){
      this.row = this.rowCity
    }else if(this.rowMembershipType){
      this.row = this.rowMembershipType
    }else if(this.rowMember){
      this.row = this.rowMember
    }else if(this.rowEquipmentType){
      this.row = this.rowEquipmentType
    }else if(this.rowAttendance){
      this.row = this.rowAttendance
    }
  }
  deleteElement(){
      if(this.rowCity){
        this._serviceCity.deleteElement(this.row.id).subscribe((resp)=>this.responseAction(resp))
      }
      if(this.rowMembershipType){
        this._serviceMembershipType.delete(this.row.id).subscribe((resp)=>this.responseAction(resp))
      }
      if(this.rowMember){
        this._serviceMember.delete(this.row.id).subscribe((resp)=>this.responseAction(resp))
      }
      if(this.rowEquipmentType){
        this._serviceEquipmentype.delete(this.row.id).subscribe((resp)=>this.responseAction(resp))
      }
      if(this.rowAttendance){
        this._serviceAttendance.delete(this.row.id).subscribe((resp)=>this.responseAction(resp))
      }
  }
  responseAction(resp: ResponseModel<any>){
    if(!resp.hasError){
      this.closeModal(true)
    }else{
      this.alertS.errorAlert('Error')
    }
  }
  closeModal(refresh:boolean = false){
    this.myModal.hide()
    let close = {
      closeModal: true,
      refreshData:refresh
    }
    this.closeModalEvent.emit(close)
  }
}