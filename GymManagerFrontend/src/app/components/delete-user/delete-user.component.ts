import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/interfaces/user';
import * as bootstrap from 'bootstrap';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  @Input() row?: User;
  @Output() closeModalEvent: EventEmitter<Object> = new EventEmitter<Object>()
  myModal!: bootstrap.Modal;

  constructor(private userService: AccountService,
    private alertS: SwalAlertService){

  }
  ngOnInit(): void {
    this.myModal = new bootstrap.Modal(<HTMLInputElement>document.getElementById('staticBackdrop'))
    this.myModal.show()
    console.log(this.row, "informacion del usuario")
    
  }
  eliminarUsuario(){
    if(this.row?.id){
      this.userService.delete(this.row.id).subscribe((resp)=>{
        if(!resp.hasError){
          this.closeModal(true)
        }else{
          this.alertS.errorAlert('Error')
        }
        })
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
