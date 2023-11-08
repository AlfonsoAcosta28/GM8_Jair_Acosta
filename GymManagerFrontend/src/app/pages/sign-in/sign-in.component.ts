import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { User, signIn } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  constructor(private login: AccountService, 
    private router:Router, 
    private alertS: SwalAlertService,
    private cookie: CookieService){
  }

  respForm(request: User){
    let resp: signIn = {
      userName: request.email,
      password: request.password
    };
    // console.log("Salida", request)
    this.login.SingIn(resp).subscribe(response =>{
    
      if(response.hasError){
        this.alertS.errorAlert("Incorrect username and/or password")
        return
      }
      if(response.message === 'Authorized'){
        // environment.hasSession = true
        let session = {...response.model, hasSession: true}
        let objTemp = btoa(JSON.stringify(session))

        this.cookie.put('session', objTemp)
        this.router.navigate(['/home'])
      }
    });
  }
}
