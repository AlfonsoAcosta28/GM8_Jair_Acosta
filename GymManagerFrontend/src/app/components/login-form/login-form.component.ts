import { Component, EventEmitter, Input,OnChanges,Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnChanges{

  @Input() isSignUp!: boolean;
  @Input() confirmButtonText = "Sign In"
  @Input() dataUser?: User
  @Output() responseForm: EventEmitter<any> = new EventEmitter();
  @Output() cancelForm: EventEmitter<boolean> = new EventEmitter();

  formUser!: FormGroup;
  defaultFields = {
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('',Validators.required)
  }
  extraFields = {
    firstName:new FormControl('', Validators.required),
    lastName:new FormControl('', Validators.required),
    phoneNumber:new FormControl('', Validators.required)
  }
  hasSession: boolean = false;
  constructor(private fb:FormBuilder, private cookie: CookieService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    const {dataUser} = changes
    this.initForm();
    this.validatorSection();

    if(!!dataUser?.currentValue){
      this.loadUserInForm(dataUser.currentValue)
    }
  }
  loadUserInForm(currentValue: User) {
    // this.formUser.get('firstName').setValue('')
    this.formUser.patchValue(currentValue)
  }
  validatorSection() {
    const session = this.cookie.get('session');
    let dataUser 

    if(!!session){
      dataUser = JSON.parse(atob(session != undefined ? session : ''))
    }
    if(dataUser?.hasSession){
      this.hasSession = true
    }else{
      this.hasSession = false      
    }
  }

  initForm(){
    let usersFields = {...this.defaultFields};

      if(this.isSignUp){
        usersFields = {...this.defaultFields, ...this.extraFields};
      }
    this.formUser = this.fb.group(
      usersFields
    )
    if(this.dataUser){
      this.formUser.removeControl('password')
      this.formUser.removeControl('email')
    }
  }

  onSubmitForm(){
    if(this.formUser.invalid){
      alert("All fields must be filled");
      return;
    }
    this.responseForm.emit(this.formUser.value);
  }

  cancelBtn(){
    this.cancelForm?.emit(true)
  }
}
