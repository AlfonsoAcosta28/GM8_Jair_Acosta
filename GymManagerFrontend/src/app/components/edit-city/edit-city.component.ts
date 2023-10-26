import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { City } from 'src/app/core/interfaces/city';
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CitiesService } from 'src/app/core/services/cities.service';
@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {

  constructor(private fb: FormBuilder, private _service : CitiesService){

  }
  @Input() row?: City;
  @Input() confirmButtonText = "Add City"
  @Output() closeModalEvent: EventEmitter<Object> = new EventEmitter<Object>()
  myModal!: bootstrap.Modal;
  formUser!: FormGroup;
  defaultFields = {
    name: new FormControl('', Validators.required),
  };

  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(<HTMLInputElement>document.getElementById('staticBackdrop'))
    this.myModal.show()
    this.formUser = this.fb.group(this.defaultFields);
    if(!!this.row){
      this.confirmButtonText = 'Update City'
      this.formUser.patchValue(this.row);
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

  cancelForm(close: boolean){
    if(close){
      this.closeModal()
    }
  }

  responseForm(){

    let response = this.formUser.value;
    // let request = {...response, status:true}
    if(!!this.row && this.row.id != undefined){
      this._service.update(response, this.row.id).subscribe((resp)=>{
      if(!resp.hasError){
        this.closeModal(true)
      }else{
        // this.alertS.errorAlert('resp.message')
      }
      })
      return
    }else{
      this._service.add(response).subscribe(resp => {
        if(!resp.hasError){
          this.closeModal(true)
        }else{
          // this.alertS.errorAlert(resp.model[0].code)
          
        }
      }, error =>{
        // this.alertS.errorAlert('Servicio no disponible por el momento')
      });
    }

  }
}
