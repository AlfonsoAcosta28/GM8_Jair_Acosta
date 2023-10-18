import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  constructor(private login: AccountService, private router: Router){
  }

  respForm(response:User){
    console.log("Respuesta sign up ",response);
    
    this.login.SingUp(response).subscribe(() => this.router.navigate(['/sign-in']));
  }
}