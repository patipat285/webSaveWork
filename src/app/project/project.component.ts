import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  showModalBox = false;
  display: boolean = false;


  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit() { }

  fnCreateAndEditProject(type){
    if(type){
      if(type === 'create'){
        this.display = true;
      }else if(type === 'edit'){
        this.display = true;
      }
    }
  }


  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            //Actual logic to perform a confirmation
        }
    });
}







}





