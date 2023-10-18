import { Component, EventEmitter, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})

export class SendEmailComponent implements OnChanges{

  @Output() responseForm: EventEmitter<any> = new EventEmitter();
  formMensaje!: FormGroup;
  defaultFields = {
    email: new FormControl('', [Validators.required, Validators.email]),
    name:new FormControl('', Validators.required),
    lastName:new FormControl('', Validators.required),
    message:new FormControl('', Validators.required)
  }
  constructor(private fb:FormBuilder,private alertS: SwalAlertService){
 
    this.initForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
  }

  initForm(){
    let usersFields = {...this.defaultFields};
    this.formMensaje = this.fb.group(
      usersFields
    )
  }

  onButtonClicked(buttonName: string) {
    if (buttonName === 'Contact') {
      this.alertS.infoAlert(`Thank you! soon Engineer ${this.formMensaje.value.name} ${this.formMensaje.value.lastName} will contact you`)
    } else if (buttonName === 'Report') {
      this.alertS.errorAlert(`Oh! We didn't expect you to report to Engineer ${this.formMensaje.value.name} ${this.formMensaje.value.lastName} , he will contact you`)
    }
  }

  onSubmitForm(){
    if(this.formMensaje.invalid){
      alert("All fields must be filled");
      return;
    }
    this.responseForm.emit(this.formMensaje.value);

    this.formMensaje.reset();
    // this.responseForm.emit(this.formMensaje);
    alert('Mensaje enviado con exito')
  }
}
