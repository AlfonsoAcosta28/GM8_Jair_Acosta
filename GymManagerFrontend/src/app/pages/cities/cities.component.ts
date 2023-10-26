import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { City } from 'src/app/core/interfaces/city';
import { CitiesService } from 'src/app/core/services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit{

  constructor(private accountService:CitiesService) {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription !: Subscription
  data !: City[]
  rowSelected: City | undefined
  deleteRowSelected: City | undefined
  newElement= false
  displayedColumns: string[] = [
    'name',
    'edit',
    'delete',
  ];
  dataSource!: MatTableDataSource<City>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit(): void {
    this.loadData()
  }
  loadData() {
    this.subscription = this.accountService.getAll().subscribe(response =>{
      
      this.dataSource = new _MatTableDataSource(response.model)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.data = response.model
    })
  }

  openModal(row: City){
    this.rowSelected = row;
  }

  openNew(){
    this.newElement = true
  }

  onCloseHandled(dataModal:any){
    this.rowSelected = undefined
    this.newElement = false
    this.deleteRowSelected = undefined

    if(dataModal.refreshData){
      this.subscription.unsubscribe()
      this.loadData()
    }
  }

  deleteElemente(user:City){
    this.deleteRowSelected = user
  }
}
