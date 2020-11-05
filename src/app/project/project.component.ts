import { RequestService } from '../../../service/request.service';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  displayModal: boolean = false;
  projectName ='' ;
  dataListProject: any;
  idProject: any;
  headerPopup = ''
  datatablecopy : any;
  searchProjectName : any;
  checkDupNameProject = 'project นี้มีอยู่แล้ว'
  submitted  = false;



  constructor(
    private confirmationService: ConfirmationService,
    private RequestService: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    this.fnGetDataProject();
  }

  //popup Create / edit
  fnCreateAndEditProject() {
    this.displayModal = true;
    this.headerPopup = 'Create Project'
  }

   fnSubmit(id) {
     this.submitted = true;
     if(this.projectName == undefined || this.projectName === ''){
       Swal.fire({
         icon: 'warning',
         title: 'required field',
         text: 'กรุณากรอกข้อมูล',

        })
        return
      }
      this.displayModal = false;
    let data = {
      projectName: this.projectName
    };
    let text;
    this.fnCheckDupProject(data)


    if (id) {
      text = "Do you want to Update Project?"
    } else {
      text = "Do you want to Create Project?"
    }
    Swal.fire({
      title: 'Are you sure?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm!',
    }).then((result) => {
      if (result.isConfirmed === true) {
        if(this.idProject){
          this.RequestService.updateDataProject(this.idProject,data).subscribe((data) => {
            Swal.fire('Success!', 'Update Project Success', 'success');
            this.fnGetDataProject()
          });
        }
        this.RequestService.createProject(data).subscribe((data) => {
          Swal.fire('Success!', 'Create Project Success', 'success');
          this.projectName = '';
          this.fnGetDataProject()
        });
      }
    });
  }


  //Get aLL data project
  fnGetDataProject() {
    this.RequestService.getAllDataProject().subscribe((data) => {
      this.dataListProject = data;

    });
  }




  fnEditProject(id) {
    this.headerPopup = 'Update Project'
    this.displayModal = true;
    this.idProject = id;
    if (this.idProject) {
      this.RequestService.getDataProjectByIdForUpdate(this.idProject).subscribe(
        (data) => {
        this.projectName = data['projectName'];
        }
      );
    }
  }



  fnDeleteProject(id){
  Swal.fire({
    title: "Are you sure?",
    text: `Do you want to delete Project?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.value) {
      this.RequestService.deleteDataProject(id).subscribe((res) => {
        Swal.fire("Deleted!", "delete project success", "success");
        this.fnGetDataProject();
      });
    }
  });

  }


  fnSearchDataProject() {
    this.submitted = true;
    if(this.searchProjectName == undefined || this.searchProjectName === ''){
      Swal.fire({
        icon: 'warning',
        title: 'required field',
        text: 'กรุณากรอกข้อมูล',
       })
       this.displayModal = false;
       return
     }

    let searchProject = {
      projectName: this.searchProjectName
    };
    this.RequestService.searchDataProject(searchProject).subscribe(
      (data) => {
        this.dataListProject = data ;
      }
    );
  }



  closeModal(){
    this.displayModal = false;
    this.projectName = ''
    this.submitted = false;
  }

  clickClear(){
    this.fnGetDataProject();
    this.searchProjectName = ''

  }



  fnCheckDupProject(datachek){
  let checkDup = datachek;
  this.RequestService.getAllDataProject().subscribe((data) => {
    let dataForCheckDup : any  = data;
        for (const check of dataForCheckDup) {
           if(check.projectName === checkDup.projectName){
            Swal.fire({
              icon: 'error',
              title: 'ข้อมูลซ้ำ',
              text: 'Project นี้มีอยู่แล้ว',
            })
          }
        }
    });
  }










}
