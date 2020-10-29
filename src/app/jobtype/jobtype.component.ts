import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jobtype',
  templateUrl: './jobtype.component.html',
  styleUrls: ['./jobtype.component.css']
})
export class JobtypeComponent implements OnInit {



  showModalBox = false;
  display: boolean = false;

  constructor() { }



  ngOnInit() {}


  fnCreateAndEditJobtype(type){
    if(type){
      if(type === 'create'){
        this.display = true;
      }else if(type === 'edit'){
        this.display = true;
      }
    }

  }

}
