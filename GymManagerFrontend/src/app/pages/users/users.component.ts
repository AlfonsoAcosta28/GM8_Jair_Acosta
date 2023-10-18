import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UserEditorDComponent } from 'src/app/components/dialog/user-editor/user-editor.component';
import { User } from 'src/app/core/interfaces/user';
import { AccountService } from 'src/app/core/services/account.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = [
    'email', 
    'firstName',
    'lastName', 
    'phoneNumber',
    'status',
    'delete'
  ];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  rowSelected: User | undefined
  deleteRowSelected: User | undefined
  display: string = 'none'
  newUser = false
  deleteUser = false
  usersSubscription !: Subscription
  showTable: boolean = true
  usersData !: User[]
  
  constructor(private accountService:AccountService,
    public dialog: MatDialog) {
  }


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
    this.usersSubscription = this.accountService.getUsers().subscribe(response =>{
      let usersActive: User[] = []
      response.model.forEach(element => {
        if(element.status){
          usersActive.push(element)
        }
      });
      this.dataSource = new _MatTableDataSource(usersActive)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.usersData = usersActive
    })
  }

  openModal(row: User){
    this.rowSelected = row;
  }

  openNewUser(){
    this.newUser = true
  }
  onCloseHandled(dataModal:any){
    this.rowSelected = undefined
    this.newUser = false
    this.deleteRowSelected = undefined
    

    if(dataModal.refreshData){
      this.usersSubscription.unsubscribe()
      this.loadData()
    }
  }

  
  openDialog(row:User){
    const dialogRef = this.dialog.open(UserEditorDComponent, {
      disableClose:true,
      data: row,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if(!!result.refreshData){
        console.log('reload Data')
        this.usersSubscription.unsubscribe()
        this.loadData()
      }
    });
  }

  changeView(){
    this.showTable = !this.showTable
  }

  getIniciales(user: User){
    return ((user.firstName).charAt(0) + (user.lastName).charAt(0)).toUpperCase()
  }

  eliminarUsuario(user:User){
    // this.deleteUser = true
    this.deleteRowSelected = user
  }
}
