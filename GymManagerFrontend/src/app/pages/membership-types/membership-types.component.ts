import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MembershipTypes } from 'src/app/core/interfaces/membership-types';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';

@Component({
  selector: 'app-membership-types',
  templateUrl: './membership-types.component.html',
  styleUrls: ['./membership-types.component.scss'],
})
export class MembershipTypesComponent implements OnInit {
  constructor(
    private accountService: MembershipTypesService,
    private _dateService: DateFormatService) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data!: MembershipTypes[];
  rowSelected: MembershipTypes | undefined;
  deleteRowSelected: MembershipTypes | undefined;
  newElement = false;
  displayedColumns: string[] = [
    'name',
    'cost',
    'createdOn',
    'duration',
    'edit',
    'delete',
  ];
  dataSource!: MatTableDataSource<MembershipTypes>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData() {
    this.subscription = this.accountService.getAll().subscribe((response) => {
      let model: MembershipTypes[] = response.model.map((element) => {
        const copy = { ...element };
        copy.createdOn = this._dateService.formatDateTime(copy.createdOn);
        return copy;
      });

      this.dataSource = new _MatTableDataSource(model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.data = response.model;
    });
  }

  openModal(row: MembershipTypes) {
    this.rowSelected = this.data.filter(e => e.id === row.id)[0];
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

  deleteElemente(user: MembershipTypes) {
    this.deleteRowSelected = user;
  }
}
