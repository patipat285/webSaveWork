import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private url: string = 'http://localhost:3000';

  constructor(public http: HttpClient) {}

  //--------------------------------Project-----------------------------------//

  createProject(data: any) {
    console.log('ProjectService -> createProject -> data', data);

    try {
      return this.http.post(this.url + '/project/createProject', data);
    } catch (error) {
      console.log(' error', error);
    }
  }

  getAllDataProject() {
    try {
      return this.http.get(this.url + '/project/getDataProject');
    } catch (error) {
      console.log(' error', error);
    }
  }

  getDataProjectByIdForUpdate(id) {
    try {
      return this.http.get(this.url + '/project/getDataProjectforupdate/' + id);
    } catch (error) {
      console.log('error',error );
    }
  }

  updateDataProject(id, data) {
    try {
      return this.http.put(this.url + '/project/updateProject/' + id, data);
    } catch (error) {
      console.log(' error', error);
    }
  }

  deleteDataProject(id) {
    try {
      return this.http.delete(this.url + '/project/deleteDataProject/' + id);
    } catch (error) {
      console.log(' error', error);
    }
  }

  searchDataProject(data) {
    try {
      return this.http.post(this.url + '/project/searchListProject', data);
    } catch (error) {
      console.log(' error', error);
    }
  }

  //-------------------------------- End Project--------------------------------------//


  //------------------------------------jobtype---------------------------------------//




  //--------------------------------end jobtype---------------------------------------//
}
