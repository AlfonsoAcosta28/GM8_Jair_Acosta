import { Component, OnInit } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { Member } from 'src/app/core/interfaces/member';
import { MembersService } from 'src/app/core/services/members.service';

@Component({
  selector: 'app-new-members',
  templateUrl: './new-members.component.html',
  styleUrls: ['./new-members.component.scss'],
})
export class NewMembersComponent implements OnInit{
  members:Member[] = []

  constructor(private _service:MembersService){}

  ngOnInit(): void {
    this._service.getAll().subscribe(resp =>{
      this.members = resp.model
      this.filtermembersByCurrentMonth()
      this.countmembersByInterval()
    });
  }
  filtermembersByCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 

    this.members = this.members.filter((member) => {
      const dateIn = new Date(member.registeredOn);
      const attendanceMonth = dateIn.getMonth() + 1;

      return attendanceMonth === currentMonth;
    });
  }
  countmembersByInterval() {
    for (const member of this.members) {
      const dateIn = new Date(member.registeredOn);
      const day = dateIn.getDate();

      if (day >= 1 && day <= 5) {
        this.assistsByInterval[0]++;
      } else if (day >= 6 && day <= 10) {
        this.assistsByInterval[1]++;
      } else if (day >= 11 && day <= 15) {
        this.assistsByInterval[2]++;
      } else if (day >= 16 && day <= 20) {
        this.assistsByInterval[3]++;
      } else if (day >= 21 && day <= 25) {
        this.assistsByInterval[4]++;
      } else if (day >= 26 && day <= 30) {
        this.assistsByInterval[5]++;
      }
    }
    this.barChartData = [
      { data: [
        this.assistsByInterval[0],
        this.assistsByInterval[1],
        this.assistsByInterval[2],
        this.assistsByInterval[3],
        this.assistsByInterval[4],
        this.assistsByInterval[5],
      ]}
    ];

  }
  data:number[] = []
  public barChartType = 'bar';

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['1-5', '5-10', '10-15', '15-20','20-25','25-30'];
  public barChartLegend = false;
  public barChartData = [
    { data:[0,0,0,0,0,0]}
  ];
  public assistsByInterval: number[] = [0, 0, 0, 0, 0, 0];
  onExportClick() {
    const op = {
      filename: '',
      image: { type: 'jpeg' },
      html2canvas: {},
      jsPDF: { orientation: 'landscape' },
    };
    const element: HTMLElement | null =
      document.getElementById('element-to-export');

    if (element !== null) {
      const content: Element = element;
      html2pdf().from(content).set(op).save();
    } else {
      console.error(
        'No se encontró ningún elemento con el ID "element-to-export"'
      );
    }
  }
}
