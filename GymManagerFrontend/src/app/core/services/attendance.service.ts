import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { Attendance } from '../interfaces/attendance';
import { ResponseArrayModel, ResponseModel } from '../interfaces/response-model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  urlBase: string = 'https://localhost:7025/';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) { }

    errorHandler(error: HttpErrorResponse) {
        console.log(error.error);
        return throwError(error);
    }

    getAll() {
        let url: string = `${this.urlBase}api/Attendance`;
        return this.http
            .get<ResponseArrayModel<Attendance>>(url, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    getDay() {
      let url: string = `${this.urlBase}api/Attendance/today`;
      return this.http
          .get<ResponseArrayModel<Attendance>>(url, this.httpOptions)
          .pipe(catchError(this.errorHandler));
  }

    add(id: number): Observable<ResponseModel<any>> {
        let url: string = `${this.urlBase}api/Attendance/${id}`;
        return this.http
            .post<ResponseModel<any>>(url, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    update(element: Attendance, id: number): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/Attendance/${id}`;
        return <any>(
            this.http
                .put<ResponseModel<any>>(url, element, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }

    delete(id: number): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/Attendance/${id}`;
        return <any>(
            this.http
                .delete<ResponseModel<any>>(url, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }
}
