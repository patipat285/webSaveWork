import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import Swal from 'sweetalert2';
import * as moment from 'moment';



@Component({
  selector: 'app-save-work',
  templateUrl: './save-work.component.html',
  styleUrls: ['./save-work.component.css'],
})
export class SaveWorkComponent implements OnInit {
  dataDropdownProject: any = [];
  dataDropdownJobType: any = [];
  selectProject: any;
  displayModal = false;
  dataCreate: any = {
    date: new Date(Date()),
    project: '',
    jobType: '',
    detail: '',
    timeIn: new Date('November 05, 1990 09:00:00'),
    timeOut: new Date('November 05, 1990 18:00:00'),
  };

  dataListWork: any;
  sumHour: any;
  sumTotalHour = 0;
  // mode = 'month';
  selectedValueDate = new Date(Date());
  headerPopup = '';
  idWork: any;
  searchFromDateFrom: any;
  searchFromProject: any;
  searchFromJobType: any;
  submitted = false;
  sat :any;
  sun :any;

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private RequestService: RequestService) {}

  ngOnInit() {
    this.fnGetDropdownProject();
    this.fnGetDataDropdownJobType();
    this.fnGetDataWork();
    this.fnHoliday();
  }

  fnGetDropdownProject() {
    try {
      this.RequestService.getAllDataProject().subscribe((data) => {
        this.dataDropdownProject = data;
      });
    } catch (error) {
      console.log(' error', error);
    }
  }

  fnGetDataDropdownJobType() {
    try {
      this.RequestService.getAllDataJobType().subscribe((data) => {
        this.dataDropdownJobType = data;
      });
    } catch (error) {
      console.log(' error', error);
    }
  }

  fnSaveWork() {
    this.displayModal = true;
  }

  fnSubbmitSaveWork(id) {
    this.submitted = true;
    if (
      this.dataCreate.date === null ||
      this.dataCreate.project === '' ||
      this.dataCreate.jobType === '' ||
      this.dataCreate.detail === '' ||
      this.dataCreate.timeIn === null ||
      this.dataCreate.timeOut === null
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'required field',
        text: 'กรุณากรอกข้อมูล',
      });
      return;
    }
    this.displayModal = false;

    let data: any;
    data = this.dataCreate;
    let text;

    if (id) {
      text = 'Do you want to Update Work?';
    } else {
      text = 'Do you want to Create Work?';
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
        if (this.idWork) {
          this.RequestService.updateDataWork(this.idWork, data).subscribe(
            (data) => {
              Swal.fire('Success!', 'Update Project Success', 'success');
              this.fnGetDataWork();
            }
          );
        }
        this.RequestService.saveWork(data).subscribe((data) => {
          Swal.fire('Success!', 'Create Project Success', 'success');
          this.dataCreate = {};
          this.fnGetDataWork();
        });
      }
    });
  }

  fnEditWork(id) {
    this.headerPopup = 'Update Work';
    this.displayModal = true;
    this.idWork = id;
    if (this.idWork) {
      this.RequestService.getDataWorkeByIdForUpdate(this.idWork).subscribe(
        (data) => {
          console.log('SaveWorkComponent -> fnEditWork -> data', data);
          this.dataCreate.date = moment(data['date']).format('DD-MM-YYYY');
          this.dataCreate.detail = data['detail'];
          this.dataCreate.jobType = data['jobType'];
          this.dataCreate.project = data['project'];
          this.dataCreate.timeIn = moment(data['timeIn']).format('HH:mm');
          this.dataCreate.timeOut = moment(data['timeOut']).format('HH:mm');
          console.log(
            'SaveWorkComponent -> fnEditWork -> this.dataCreate',
            this.dataCreate
          );
        }
      );
    }
  }

  //Get aLL data Work
  fnGetDataWork() {
    this.RequestService.getAllDataWork().subscribe((data) => {
      console.log('SaveWorkComponent -> fnGetDataWork -> data', data);
      this.dataListWork = data;
      let sumtimeIN;
      let sumtimeOut;
      let datalist;
      let sumTotal = 0;

      for (datalist of this.dataListWork) {
        sumtimeIN = moment(datalist.timeIn).format('yyyy-MM-DD HH:mm:ss');
        sumtimeOut = moment(datalist.timeOut).format('yyyy-MM-DD HH:mm:ss');
        this.sumHour = this.fnCalDiffHourFromTimeInTimeOut(
          new Date(sumtimeIN),
          new Date(sumtimeOut)
        );
        datalist.hour = this.sumHour;
        sumTotal = sumTotal + datalist.hour;
        this.sumTotalHour = sumTotal;
        datalist.date = moment(datalist.date).format('DD-MM-YYYY');
        datalist.timeIn = moment(datalist.timeIn).format('HH:mm');
        datalist.timeOut = moment(datalist.timeOut).format('HH:mm');
      }
      console.log(
        'SaveWorkComponent -> fnGetDataWork -> this.dataListWork',
        this.dataListWork
      );
    });
  }

  //คำนวน ชั่วโมงจาก เวลา เข้า-ออก
  fnCalDiffHourFromTimeInTimeOut(startDate, endDate) {
    var diff = endDate.getTime() - startDate.getTime();
    var days = Math.floor(diff / (60 * 60 * 24 * 1000));
    var hours = Math.floor(diff / (60 * 60 * 1000)) - days * 24;
    return hours - 1;
  }

  //เลือกวันที่จากตาราง
  // selectDate(event) {
  // console.log("SaveWorkComponent -> selectDate -> event", event)

  // this.headerPopup = 'Save Work'
  // this.displayModal = true;
  // this.dataCreate.date = event
  // }

  fnDeleteWork(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete Work?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.RequestService.deleteDataWork(id).subscribe((res) => {
          Swal.fire('Deleted!', 'delete work success', 'success');
          this.fnGetDataWork();
        });
      }
    });
  }

  closeModal() {
    this.displayModal = false;
    this.dataCreate = {};
  }

  fnSearchDataWork() {
    let searchWork = {
      searchFromDateFrom: this.searchFromDateFrom,
      searchFromProject: this.searchFromProject,
      searchFromJobType: this.searchFromJobType,
    };
    this.RequestService.searchDataWork(searchWork).subscribe((data) => {
      let sumtimeIN;
      let sumtimeOut;
      let datalist;
      let sumTotal = 0;
      this.dataListWork = data;
      for (const data of this.dataListWork) {
        sumtimeIN = moment(data.timeIn).format('yyyy-MM-DD HH:mm:ss');
        sumtimeOut = moment(data.timeOut).format('yyyy-MM-DD HH:mm:ss');
        this.sumHour = this.fnCalDiffHourFromTimeInTimeOut(
          new Date(sumtimeIN),
          new Date(sumtimeOut)
        );
        data.hour = this.sumHour;
        sumTotal = sumTotal + data.hour;
        this.sumTotalHour = sumTotal;
        data.date = moment(data.date).format('DD-MM-YYYY');
        data.timeIn = moment(data.timeIn).format('HH:mm');
        data.timeOut = moment(data.timeOut).format('HH:mm');
      }
    });
  }

  clickClear() {
    this.fnGetDataWork();
    this.searchFromDateFrom = '';

    this.searchFromProject = '';
    this.searchFromJobType = '';
    this.sumTotalHour = 0;
  }

  closeModalDevxtream(event) {
    console.log('SaveWorkComponent -> closeModalDevxtream -> event', event);
    event.cancel = true;
    this.displayModal = true;
    this.headerPopup = 'Save Work';
    this.dataCreate.date = event.appointmentData.startDate;

    (this.dataCreate.timeIn = new Date('November 05, 1990 09:00:00')),
      (this.dataCreate.timeOut = new Date('November 05, 1990 18:00:00'));
  }



  fnHoliday(){
    var d = new Date();
    var getTot = this.daysInMonth(d.getMonth(),d.getFullYear()); //Get total days in a month
    var sat = new Array();   //Declaring array for inserting Saturdays
    var sun = new Array();   //Declaring array for inserting Sundays

    for(var i=1;i<=getTot;i++){    //looping through days in month
        var newDate = new Date(d.getFullYear(),d.getMonth(),i)
        if(newDate.getDay()==0){   //if Sunday
            sun.push(i);
        }
        if(newDate.getDay()==6){   //if Saturday
            sat.push(i);
        }

    }

    this.sat = sat;
    this.sun = sun;
    console.log(sat);
    console.log(sun);

  }

  daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}




}
