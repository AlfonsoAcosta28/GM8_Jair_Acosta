import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, catchError, Observable } from 'rxjs';
import { ResponseArrayModel, ResponseModel } from '../interfaces/response-model';
import { EquipamentType } from '../interfaces/equipament-type';

@Injectable({
  providedIn: 'root'
})
export class EquipamentTypeService {

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
        let url: string = `${this.urlBase}api/EquipmentTypes`;
        return this.http
            .get<ResponseArrayModel<EquipamentType>>(url, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    add(elemenet: EquipamentType): Observable<ResponseModel<any>> {
        let url: string = `${this.urlBase}api/EquipmentTypes`;
        return this.http
            .post<ResponseModel<any>>(url, elemenet, this.httpOptions)
            .pipe(catchError(this.errorHandler));
    }

    update(element: EquipamentType, id: number): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/EquipmentTypes/${id}`;
        return <any>(
            this.http
                .put<ResponseModel<any>>(url, element, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }

    delete(id: number): Observable<ResponseModel<any>> {
        const url: string = `${this.urlBase}api/EquipmentTypes/${id}`;
        return <any>(
            this.http
                .delete<ResponseModel<any>>(url, this.httpOptions)
                .pipe(catchError(this.errorHandler))
        );
    }
}
