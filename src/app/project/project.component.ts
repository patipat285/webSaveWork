import { ProjectService } from './../../../service/project.service';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  displayModal: boolean = false;
  projectName: any ;
  dataListProject: any;
  idProject: any;
  headerPopup = ''
  datatablecopy : any;
  searchProjectName : any;

  constructor(
    private confirmationService: ConfirmationService,
    private ProjectService: ProjectService,
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
    this.displayModal = false;
    let data = {
      projectName: this.projectName
    };
    if (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to Update Project?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update it!',
      }).then((result) => {
        if (result.value === true) {
          if (this.idProject) {
            console.log(
              'ProjectComponent -> fnSubmitCreate -> this.idProject',
              this.idProject
            );

            this.ProjectService.updateDataProject(
              this.idProject,
              data
            ).subscribe((data) => {
              console.log('Log data', data);
              Swal.fire('Success!', 'Update Project Success', 'success');
              this.fnGetDataProject()


            });
          }
        }
      });
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to Create Project?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Create it!',
      }).then((result) => {
        console.log('ProjectComponent -> fnSubmitCreate -> result', result);
        if (result.value === true) {
          this.ProjectService.createProject(data).subscribe((data) => {
            console.log('Log data', data);
            Swal.fire('Success!', 'Create Project Success', 'success');
            this.projectName = '';
            this.fnGetDataProject()
          });
        }
      });
    }
  }


  //Get aLL data project
  fnGetDataProject() {
    this.ProjectService.getAllDataProject().subscribe((data) => {
      this.dataListProject = data;
      console.log(' this.dataListProject', this.dataListProject);
    });
  }




  fnEditProject(id) {
    this.headerPopup = 'Update Project'
    this.displayModal = true;
    this.idProject = id;
    if (this.idProject) {
      this.ProjectService.getDataProjectByIdForUpdate(this.idProject).subscribe(
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
      this.ProjectService.deleteDataProject(id).subscribe((res) => {
        Swal.fire("Deleted!", "delete project success", "success");
        this.fnGetDataProject();
      });
    }
  });

  }


  fnSearchDataProject() {
    let searchProject = {
      projectName: this.searchProjectName
    };
    this.ProjectService.searchDataProject(searchProject).subscribe(
      (data) => {
        this.dataListProject = data ;
      }
    );
  }



  closeModal(){
    this.displayModal = false;
    this.projectName = ''
  }

  clickClear(){
    this.fnGetDataProject();
    this.searchProjectName = ''

  }










}
