import { Component, Input } from '@angular/core';
import {environment } from 'src/environments/environment'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  hasSession = environment.hasSession;

  
  @Input() initHome!: boolean;
  @Input() home!: boolean;
}
