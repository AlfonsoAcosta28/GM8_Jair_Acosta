import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { Observable, Subscription, map, startWith } from 'rxjs';
import { Attendance } from 'src/app/core/interfaces/attendance';
import { Member } from 'src/app/core/interfaces/member';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { MembersService } from 'src/app/core/services/members.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
})
export class AttendanceComponent implements OnInit {
  constructor(
    private _services: AttendanceService,
    private _dateService: DateFormatService,
    private alert: SwalAlertService
  ) {}
  
  updateCheckIn:boolean = false
  //
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data!: Attendance[];
  rowSelected: Attendance | undefined;
  deleteRowSelected: Attendance | undefined;
  newElement = false;
  displayedColumns: string[] = [
    'dateIn',
    'dateOut',
    'member',
  ];
  dataSource!: MatTableDataSource<Attendance>;

  ngOnInit(): void {
    this.loadData();

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  loadData() {
    this.subscription = this._services.getAll().subscribe((response) => {
      let model: Attendance[] = response.model.map((element) => {
        const copy = { ...element };
        copy.dateIn = this._dateService.formatDateTime(copy.dateIn);
        copy.dateOut = this._dateService.formatDateTime(copy.dateOut);
        return copy;
      });

      this.dataSource = new _MatTableDataSource(model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.data = response.model;
    });
  }

  openModal(row: Attendance) {
    this.rowSelected = row;
  }

  openNew() {
    this.newElement = true;
  }

  onCloseHandled(dataModal: any) {
    this.rowSelected = undefined;
    this.newElement = false;
    this.deleteRowSelected = undefined;

    if (dataModal.refreshData) {
      this.subscription.unsubscribe();
      this.loadData();
    }
  }

  deleteElemente(element: Attendance) {
    this.deleteRowSelected = element;
  }

 
  handleMemberSelected(member:Member){
    if(member.id){
      this._services.add(member.id).subscribe(e => {
        if(e.hasError == false){
          this.alert.infoAlert('Registered Attendance')
          this.loadData()
          this.updateCheckIn = true
        }else{
          this.alert.errorAlert('Error')
        }
      });
    }
  }
}
