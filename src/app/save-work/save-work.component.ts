import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';
@Component({
  selector: 'app-save-work',
  templateUrl: './save-work.component.html',
  styleUrls: ['./save-work.component.css']
})
export class SaveWorkComponent implements OnInit {

  dataDropdownProject :any = [];
  dataDropdownJobType : any = [];
  selectProject :any;
  displayModal = false;
  selectDate :any;



  constructor(private RequestService: RequestService,) { }

  ngOnInit() {



    this.fnGetDropdownProject();
    this.fnGetDataDropdownJobType();
  }


  fnGetDropdownProject(){
    try {
      this.RequestService.getAllDataProject().subscribe((data) =>{
        this.dataDropdownProject = data;
      })
    } catch (error) {
    console.log(" error", error)

    }
  }

  fnGetDataDropdownJobType(){
    try {
      this.RequestService.getAllDataJobType().subscribe((data) =>{
        this.dataDropdownJobType = data;
      })
    } catch (error) {
    console.log(" error", error)

    }
  }


  fnSaveWork(){
    this.displayModal = true;
  }


  fnSubbmitSaveWork(){
    console.log("selectDateselectDateselectDateselectDate", this.selectDate);
  }

}
