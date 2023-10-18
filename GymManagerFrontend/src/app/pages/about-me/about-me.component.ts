import { Component } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent {
  email: string = 'alfonsoacosta207@gmail.com';
  githubUsername: string = 'AlfonsoAcosta28';
  showDetails: boolean = false;
  showInfo() {
    this.showDetails = !this.showDetails;
  }
}
