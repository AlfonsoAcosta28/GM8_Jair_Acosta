import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { EquipamentType } from 'src/app/core/interfaces/equipament-type';
import { EquipamentTypeService } from 'src/app/core/services/equipament-type.service';

@Component({
  selector: 'app-equipament-type',
  templateUrl: './equipament-type.component.html',
  styleUrls: ['./equipament-type.component.scss']
})
export class EquipamentTypeComponent implements OnInit{

  constructor(private _service:EquipamentTypeService) {
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subscription !: Subscription
  data !: EquipamentType[]
  rowSelected: EquipamentType | undefined
  deleteRowSelected: EquipamentType | undefined
  newElement= false
  displayedColumns: string[] = [
    'name',
    'description',
    'edit',
    'delete'
  ];
  dataSource!: MatTableDataSource<EquipamentType>;

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
    this.subscription = this._service.getAll().subscribe(response =>{
      
      this.dataSource = new _MatTableDataSource(response.model)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.data = response.model
    })
  }

  openModal(row: EquipamentType){
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

  deleteElemente(element:EquipamentType){
    this.deleteRowSelected = element
  }
}
