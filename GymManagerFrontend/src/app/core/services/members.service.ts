import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Member } from '../interfaces/member';
import {
    ResponseArrayModel,
    ResponseModel,
} from '../interfaces/response-model';

@Injectable({
    providedIn: 'root',
})
export class MembersService {
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
        let url: string = `${this.urlBase}api/Members`;
        return this.http
            .get<ResponseArrayModel<Member>>(url, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    add(element: Member): Observable<ResponseModel<any>> {
        let url: string = `${this.urlBase}api/Members`;
        return this.http
            .post<ResponseModel<any>>(url, element, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    update(element: Member, id: string): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/Members/${id}`;
        return <any>(
            this.http
                .put<ResponseModel<any>>(url, element, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }

    delete(id: string): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/Members/${id}`;
        return <any>(
            this.http
                .delete<ResponseModel<any>>(url, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }
}
