import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { User, signIn } from '../interfaces/user';
import { ResponseArrayModel, ResponseModel } from '../interfaces/response-model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  urlBase:string ='https://localhost:7025/';

  httpOptions = {
    headers:new HttpHeaders({
      'Content-Type':'application/json'
    })
  }

  constructor(private http:HttpClient) { }

  errorHandler(error:HttpErrorResponse){
    console.log(error.error)
    return throwError(error)
  }
  
  getUsers(){
    let url: string = `${this.urlBase}api/Users`;
    return this.http.get<ResponseArrayModel<User>>(url, this.httpOptions).pipe(catchError(this.errorHandler))
  }

  SingIn(request:signIn): Observable<ResponseModel<any>>{
   
    console.log("Respuesta ",request)
    
    let url : string = `${this.urlBase}api/Account`;
    return this.http.post<ResponseModel<any>>(url, request, this.httpOptions).pipe(catchError(this.errorHandler));    
  }
  
  SingUp(request:User): Observable<ResponseModel<any>>{
    console.log(request)
    let url : string = `${this.urlBase}api/Users`;
    return this.http.post<ResponseModel<any>>(url, request, this.httpOptions).pipe(catchError(this.errorHandler));    
  }

  update(request: any, id: string): Observable<ResponseModel<any>> {

    const transformedRequest = {
      firstName: request.firstName,
      lastName: request.lastName,
      phoneNumber: request.phoneNumber,
      status: true
    };

    const url: string = `${this.urlBase}api/User/${id}`;
    return <any>this.http.put<ResponseModel<any>>(url, transformedRequest, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }


  delete(id: string): Observable<ResponseModel<any>> {
    // console.log('ID ',id)
    const url: string = `${this.urlBase}api/User/${id}`;
    return <any>this.http.delete<ResponseModel<any>>(url, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }
}
