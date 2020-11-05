import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { ConfirmationService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-jobtype',
  templateUrl: './jobtype.component.html',
  styleUrls: ['./jobtype.component.css'],
})
export class JobtypeComponent implements OnInit {
  displayModal = false;
  headerPopup = '';
  jobTypeName = '';
  code = '';
  idJobType: any;
  dataListJobType: any;
  searchJobTypeName: any;
  searchCode: any;
  displayModalDetail = false;
  jobTypeNameDetail: any;
  codeDetail: any;
  submitted = false;


  constructor(private RequestService: RequestService) {}

  ngOnInit() {
    this.fnGetDataJobType();
  }




  //popup Create / edit
  fnCreateAndEditJobtype() {
    this.displayModal = true;
    this.headerPopup = 'Create Job Type';
  }



  fnSubmit(id) {
    this.submitted = true;
    if(this.jobTypeName == undefined || this.jobTypeName === '' || this.code == undefined || this.code === ''){
      Swal.fire({
        icon: 'warning',
        title: 'required field',
        text: 'กรุณากรอกข้อมูล',

       })
       return
     }
    this.displayModal = false;
    let data = {
      jobTypeName: this.jobTypeName,
      code: this.code,
    };
    let text;
    this.fnCheckDupJobType(data);
    if (id) {
      text = 'Do you want to Update Job Type?';
    } else {
      text = 'Do you want to Create Job Type?';
    }
    Swal.fire({
      title: 'Are you sure?',
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Confirm it!',
    }).then((result) => {
      if (result.isConfirmed === true) {
        if (this.idJobType) {
          this.RequestService.updateDataJobType(this.idJobType, data).subscribe(
            (data) => {
              Swal.fire('Success!', 'Update Job Type Success', 'success');
              this.fnGetDataJobType();
            }
          );
        } else {
          this.RequestService.createJobType(data).subscribe((data) => {
            Swal.fire('Success!', 'Create Job Type Success', 'success');
            this.jobTypeName = '';
            this.code = '';
            this.fnGetDataJobType();
          });
        }
      }
    });
  }


  //Get aLL data project
  fnGetDataJobType() {
    this.RequestService.getAllDataJobType().subscribe((data) => {
      this.dataListJobType = data;
      console.log(
        'JobtypeComponent -> fnGetDataJobType -> dataListJobType',
        this.dataListJobType
      );
    });
  }

  fnEditProject(id) {
    this.headerPopup = 'Update Project';
    this.displayModal = true;
    this.idJobType = id;
    if (this.idJobType) {
      this.RequestService.getDataJobTypeByIdForUpdate(this.idJobType).subscribe(
        (data) => {
          console.log('JobtypeComponent -> fnEditProject -> data', data);
          this.jobTypeName = data['jobTypeName'];
          this.code = data['code'];
        }
      );
    }
  }



  fnDeleteJobType(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete Job Type?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
          this.RequestService.deleteDataJobType(id).subscribe((res) => {
          Swal.fire('Deleted!', 'delete Job Type success', 'success');
          this.fnGetDataJobType();
        });
      }
    });
  }



  fnSearchDataJobType() {
    let searchJobType = {
      jobTypeName: this.searchJobTypeName,
      code: this.searchCode,
    };
    this.RequestService.searchDataJobType(searchJobType).subscribe((data) => {
      this.dataListJobType = data;
    });
  }



  closeModal() {
    this.displayModal = false;
    this.jobTypeName = '';
    this.code = '';
    this.submitted = false;
  }



  clickClear() {
    this.fnGetDataJobType();
    this.searchJobTypeName = '';
    this.searchCode = '';
  }


  fnShowDetailData(id) {
    this.displayModalDetail = true;
    this.idJobType = id;
    if (id) {
      this.RequestService.getDataJobTypeByIdForUpdate(this.idJobType).subscribe(
        (data) => {
          this.jobTypeNameDetail = data['jobTypeName'];
          this.codeDetail = data['code'];
        }
      );
    }
  }


  fnCheckDupJobType(datachek) {
    let checkDup = {
      jobTypeName: datachek.jobTypeName,
      code: datachek.code,
    };

    this.RequestService.getAllDataJobType().subscribe((data) => {
      let dataForCheckDup: any = data;
      let textError;
      for (const check of dataForCheckDup) {
        if (check.jobTypeName === checkDup.jobTypeName) {
          textError = 'Job Type Name นี้มีอยู่แล้ว';
        } else if (check.code === checkDup.code) {
          textError = 'Code นี้มีอยู่แล้ว';
        }
        if(textError){
          Swal.fire({
            icon: 'error',
            title: 'ข้อมูลซ้ำ',
            text: textError,
          });
        }
      }
    });
  }
}
