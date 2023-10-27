import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/core/interfaces/attendance';
import { AttendanceService } from 'src/app/core/services/attendance.service';

import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-member-attendances',
  templateUrl: './member-attendances.component.html',
  styleUrls: ['./member-attendances.component.scss']
})
export class MemberAttendancesComponent implements OnInit{

  attendances:Attendance[] = []

  constructor(private _service:AttendanceService){}

  ngOnInit(): void {
    this._service.getAll().subscribe(resp =>{
      this.attendances = resp.model
      this.filterAttendancesByCurrentMonth()
      this.countAttendancesByInterval()
    });
  }
  filterAttendancesByCurrentMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 

    this.attendances = this.attendances.filter((attendance) => {
      const dateIn = new Date(attendance.dateIn);
      const attendanceMonth = dateIn.getMonth() + 1;

      return attendanceMonth === currentMonth;
    });
  }
  countAttendancesByInterval() {
    for (const attendance of this.attendances) {
      const dateIn = new Date(attendance.dateIn);
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

