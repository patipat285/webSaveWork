import { Component, OnInit, ViewChild } from '@angular/core';
import { RequestService } from '../../../service/request.service';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';
import { NzCalendarMode } from 'ng-zorro-antd/calendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


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
  dataCreate: any = {};
  dataListWork: any;

  selectedValueDate = new Date(Date());
  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';
  calendarOptions: any;
  currentDate: Date = new Date();

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private RequestService: RequestService) {
    this.calendarOptions = {
      customButtons: {

      },
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!
      events: [],
    };
  }

  ngOnInit() {
    this.fnGetDropdownProject();
    this.fnGetDataDropdownJobType();
    this.fnGetDataWork();

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

  fnSubbmitSaveWork() {
    let data: any;
    data = this.dataCreate;
    console.log("SaveWorkComponent -> fnSubbmitSaveWork -> data", data)
    this.RequestService.saveWork(data).subscribe((data) => {
      this.fnGetDataWork();
      this.dataCreate = {};
      this.displayModal = false;
    });
  }

  //Get aLL data Work
  fnGetDataWork() {
    this.RequestService.getAllDataWork().subscribe((data) => {
      this.dataListWork = data;
      let sumTimeIN = [];
      let sumTimeOut = [];
      let sum
        for (const iterator of this.dataListWork) {
         sum =   moment(iterator.timeIn).format("HH:mm") + (moment(iterator.timeOut).format("HH:mm"))
          // sumTimeIN.push(moment(iterator.timeIn).format("HH:mm"))
          // sumTimeOut.push(moment(iterator.timeOut).format("HH:mm"))
        }
        // const sum2 = sum.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration());
        // console.log([Math.floor(sum2.asHours()), sum2.minutes()].join(':'));
        console.log("SaveWorkComponent -> fnGetDataWork -> sum", sum)
        // console.log("SaveWorkComponent -> fnGetDataWork -> sum", sumTimeOut)
    });
  }

  // selectChange(select: Date) {
  //   this.dataCreate.date = select;
  //   console.log(
  //     'SaveWorkComponent -> selectChange -> this.dataCreate.date',
  //     this.dataCreate.date
  //   );
  //   this.displayModal = true;
  // }

  // panelChange(event) {
  //   console.log('SaveWorkComponent -> panelChange -> event', event);
  // }

  handleDateClick(arg) {
    this.displayModal = true;
    this.dataCreate.date = arg.date;
  }

  onAppointmentFormOpening(event){
    event.cancel = true;
    this.dataCreate.date = event.appointmentData.startDate;
    this.displayModal = true;

}




}
