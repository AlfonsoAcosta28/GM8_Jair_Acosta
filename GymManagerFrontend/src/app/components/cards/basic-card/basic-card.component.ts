import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CardInterface, footerType } from 'src/app/core/interfaces/card-interface';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-basic-card',
  templateUrl: './basic-card.component.html',
  styleUrls: ['./basic-card.component.scss']
})
export class BasicCardComponent implements OnChanges{
  @Input() UserData!: any 
  ngOnChanges(changes: SimpleChanges): void {
    const {UserData} = changes
    if(!!UserData.currentValue){
      this.loadUserData();
    }
  }
  loadUserData() {
    if(this.card.header && !this.card.header?.siglas){
      let tmpA:string[] = []
      this.card.header?.title?.forEach(element => tmpA.push((this.UserData[element]).charAt(0)))
      this.card.header.siglas = tmpA.join('')
    }
  }

  getArrayToText(titulos:string[]){ 
    let tmpA: string[] = []
    titulos.forEach(title => tmpA.push(this.UserData[title]))
    return tmpA.join(' ')
  }
  card : CardInterface = {
    typeCard: 'basic1',
    closeHeader: false,
    header: {
      title:['firstName','lastName'],
      siglas:'',
      titleClass:''
    },
    body: {
      title:'',
      tittleClass:'',
      desc:'email',
      descClass:'',
      subDesc:'phoneNumber',
      subDescClass:''
    },
    footer: {
      label:'status',
      footerType: footerType.typeLbl,
      footerClass:'col-md-12'
    }
  }

}
