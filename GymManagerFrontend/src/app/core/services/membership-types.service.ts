import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ResponseArrayModel, ResponseModel } from '../interfaces/response-model';
import { MembershipTypes } from '../interfaces/membership-types';

@Injectable({
  providedIn: 'root',
})
export class MembershipTypesService {
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
        let url: string = `${this.urlBase}api/MembershipTypes`;
        return this.http
            .get<ResponseArrayModel<MembershipTypes>>(url, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    add(element: MembershipTypes): Observable<ResponseModel<any>> {
        let url: string = `${this.urlBase}api/MembershipTypes`;
        return this.http
            .post<ResponseModel<any>>(url, element, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    update(element: MembershipTypes, id: number): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/MembershipTypes/${id}`;
        return <any>(
            this.http
                .put<ResponseModel<any>>(url, element, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }

    delete(id: number): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/MembershipTypes/${id}`;
        return <any>(
            this.http
                .delete<ResponseModel<any>>(url, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }
}
