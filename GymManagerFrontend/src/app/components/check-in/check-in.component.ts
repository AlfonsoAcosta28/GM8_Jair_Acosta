import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Member } from 'src/app/core/interfaces/member';
import { MembersService } from 'src/app/core/services/members.service';
import { SwalAlertService } from 'src/app/core/services/swal-alert.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit, OnChanges  {
  constructor(private _serviceMember: MembersService, private alert: SwalAlertService) {}

  myControl = new FormControl('');
  members: Member[] = [];
  filteredOptions!: Observable<Member[]>;
  selectedMember: Member | null = null;
  private timer: any; 
  
  @Input() update:boolean = false
  @Output() memberSelected: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    this.autoComplete();
    console.log(this.update)
  }
  startTimer(event: any) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.members = [];
    if (event.target.value == '') {
      this.autoComplete();
      return;
    }
    this.timer = setTimeout(() => {
      this._serviceMember
        .getAllCoincidences(event.target.value)
        .subscribe((element) => {
          // console.log('Acción después de 2 segundos ',element );
          element.model.forEach((member) => {
            this.members.push(member);
            this.autoComplete();
          });
        });
    }, 500);
  }

  

  autoComplete() {
    //Autocomplete
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): Member[] {
    const filterValue = value.toLowerCase();

    return this.members.filter(
      (option) =>
        option.name.toLowerCase().includes(filterValue) ||
        option.lastName.toLowerCase().includes(filterValue)
    );
  }
  optionSelected(event: Member) {
    
    this.selectedMember = event;
  }

  updateFields(){
    this.selectedMember = null
    this.members = []
    this.myControl = new FormControl('');
    this.update = false
    this.change.emit(false)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['update']) { 
      const currentValue = changes['update'].currentValue;
      const isFirstChange = changes['update'].firstChange;

      console.log(currentValue)
      if (!isFirstChange) {
        if (currentValue) {
          this.updateFields()
        } 
      }
    }
  }
  

  attendance() {
    if (this.selectedMember) {
      // console.log('Miembro seleccionado:', this.selectedMember);
      this.memberSelected.emit(this.selectedMember)
    } else {
      this.alert.errorAlert('No member selected.')
    }
  }

  getName(member: Member) {
    return member.name + ' ' + member.lastName;
  }
}
