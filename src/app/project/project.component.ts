
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
  showModalBox = false;
  displayModal: boolean = false;

  projectName :any
  dataListProject :any ;

  constructor(
    private confirmationService: ConfirmationService,
    private ProjectService: ProjectService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fnGetDataProject();
  }


  fnCreateAndEditProject() {
    this.displayModal = true;
  }

  fnSubmitCreate(type) {
    this.displayModal = false;
    if (type === 'create') {
      let data = {
        "projectName" : this.projectName
      }
      console.log("ProjectComponent -> fnSubmitCreate -> data", data)
      Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to Add the data?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Add it!',
      }).then((result) => {
        if (result.value) {
          this.ProjectService.createProject(data).subscribe((data) => {
            console.log('Log data', data);
            Swal.fire('Success!', 'Create Project Success', 'success');
            this.router.navigate(["/project"]);
          });
        }
      });
    }
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to Delete?',
      accept: () => {
        //Actual logic to perform a confirmation
      },
    });
  }


  fnGetDataProject(){
    this.ProjectService.getAllDataProject().subscribe(data =>{
      this.dataListProject = data;
      console.log(" this.dataListProject", this.dataListProject)
    })
  }









}
