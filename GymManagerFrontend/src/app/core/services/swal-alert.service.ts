import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalAlertService {

  constructor() { }

  errorAlert(  message:string){
    return Swal.fire({
      title:"ERROR",
      text: message,
      icon: 'error',
      confirmButtonText:'Close', 
      confirmButtonColor: '#031a3d'
    })    
  }

  infoAlert( message:string){
    return Swal.fire({
      title:"Ok",
      text: message,
      icon: 'success',
      confirmButtonText:'Close', 
      confirmButtonColor: '#031a3d'
    })    
  }
}
