import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  constructor(
    private login: AccountService,
    private router: Router,
    private alertS: SwalAlertService
  ) {}

  respForm(response: User) {
    let errors: string = '';
    this.login.SingUp(response).subscribe(
      (response2) => {
        if (response2.hasError) {
          response2.model.forEach((element) => {
            errors += element.description + '\n\n';
          });
          this.alertS.errorAlert('' + errors);
          return;
        }
        this.router.navigate(['/sign-in']);
      },
      (error) => {
        if (error.status === 400) {
          const errorResponse = error.error;

          if (errorResponse && errorResponse.errors) {
            const passwordErrors = errorResponse.errors.Password;

            if (passwordErrors && passwordErrors.length > 0) {
              this.alertS.errorAlert('' + passwordErrors);
            }
          }
        } else {
          console.error('Error HTTP:', error);
        }
      }
    );
  }
}
