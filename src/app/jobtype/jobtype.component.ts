import { Component, OnInit } from '@angular/core';
import { ProjectService } from './../../../service/project.service';
import { ConfirmationService } from 'primeng/api';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jobtype',
  templateUrl: './jobtype.component.html',
  styleUrls: ['./jobtype.component.css']
})
export class JobtypeComponent implements OnInit {




  constructor( private ProjectService: ProjectService,) { }



  ngOnInit() {

  }






}
