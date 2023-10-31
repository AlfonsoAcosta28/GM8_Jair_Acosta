import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  MatTableDataSource,
  _MatTableDataSource,
} from '@angular/material/table';
import { Subscription } from 'rxjs';
import { City } from 'src/app/core/interfaces/city';
import { Member, MemberShow } from 'src/app/core/interfaces/member';
import { MembershipTypes } from 'src/app/core/interfaces/membership-types';
import { CitiesService } from 'src/app/core/services/cities.service';
import { DateFormatService } from 'src/app/core/services/date-format.service';
import { MembersService } from 'src/app/core/services/members.service';
import { MembershipTypesService } from 'src/app/core/services/membership-types.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  constructor(
    private accountService: MembersService,
    private _dateService: DateFormatService,
    private _citiesService: CitiesService,
    private _membershipTypesSerive: MembershipTypesService
  ) {}

  cities?:City[]
  membershipTypes?: MembershipTypes[]
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription!: Subscription;
  data!: Member[];
  rowSelected: Member | undefined;
  deleteRowSelected: Member | undefined;
  newElement = false;
  showTable: boolean = true;
  displayedColumns: string[] = [
    'name',
    'lastName',
    'birthDay',
    'email',
    'allowNewsLetter',
    'registeredOn',
    'membershipEnd',
    'city',
    'membershipType',
    'edit',
    'delete',
  ];
  dataSource!: MatTableDataSource<MemberShow>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this._citiesService.getAll().subscribe(response =>{
      this.cities = response.model
    })
    this._membershipTypesSerive.getAll().subscribe(response =>{
      this.membershipTypes = response.model
      this.loadData()
    })
    // this.loadData();
  }
  loadData() {
    this.subscription = this.accountService.getAll().subscribe((response) => {
      let model: MemberShow[] = [];
      let copy : MemberShow
      response.model.forEach(element => {

        copy = {
          id : element.id,
          name: element.name,
          lastName: element.lastName,
          birthDay : this._dateService.formatDate(element.birthDay),
          email: element.email,
          allowNewsLetter : element.allowNewsLetter,
          registeredOn : this._dateService.formatDateTime(element.registeredOn),
          membershipEnd : this._dateService.formatDate(element.membershipEnd),
          city: this.cities?.filter((e) => e.id === element.cityId)[0],
          membershipType: this.membershipTypes?.filter((e) => e.id === element.membershipTypeId)[0]
        }
        model.push(copy)
        // return copy;
      });

      this.dataSource = new _MatTableDataSource(model);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.data = response.model;
    });
  }

  openModal(row: Member) {
    this.rowSelected = this.data.filter((e) => e.id === row.id)[0];
    // console.log("Editar ",row)
    this.changeView();
  }

  openNew() {
    this.newElement = true;
    this.rowSelected = undefined;
    this.changeView();
  }

  refresh(dataModal: any) {
    this.rowSelected = undefined;
    this.newElement = false;
    this.deleteRowSelected = undefined;

    if (dataModal.refreshData) {
      this.subscription.unsubscribe();
      this.loadData();
    }
  }
  onCloseHandled(dataModal: any) {
    this.changeView();
    this.refresh(dataModal);
  }

  onCloseHandledDelete(dataModal: any) {
    this.refresh(dataModal);
  }

  deleteElemente(user: Member) {
    this.deleteRowSelected = user;
  }

  changeView() {
    this.showTable = !this.showTable;
  }
}
