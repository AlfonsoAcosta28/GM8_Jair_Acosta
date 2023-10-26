import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { City } from '../interfaces/city';
import {
    ResponseArrayModel,
    ResponseModel,
} from '../interfaces/response-model';

@Injectable({
    providedIn: 'root',
})
export class CitiesService {
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
        let url: string = `${this.urlBase}api/City`;
        return this.http
            .get<ResponseArrayModel<City>>(url, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    add(elemenet: City): Observable<ResponseModel<any>> {
        let url: string = `${this.urlBase}api/City`;
        return this.http
            .post<ResponseModel<any>>(url, elemenet, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    update(element: City, id: number): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/City/${id}`;
        return <any>(
            this.http
                .put<ResponseModel<any>>(url, element, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }

    deleteElement(id: string): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/City/${id}`;
        return <any>(
            this.http
                .delete<ResponseModel<any>>(url, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }
}
