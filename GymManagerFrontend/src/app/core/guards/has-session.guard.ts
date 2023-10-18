import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

// export const hasSessionGuard: CanActivateFn = (route, state) => {
//   console.log(route)
//   console.log(state)
//   return true;
// };
@Injectable({
  providedIn: 'root'
})
export class HasSessionGuard implements CanActivate{
  constructor(private router: Router, private cookie:CookieService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{

    const session = this.cookie.get('session');
    let dataUser 

    if(!!session){
      dataUser = JSON.parse(atob(session != undefined ? session : ''))
    }
    if(!dataUser?.hasSession){
      this.router.navigate(['/init-home'])
    }
    return !!dataUser?.hasSession
    
  }
  
}
