import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private url: string = "http://localhost:3000/api/project";

  constructor(public http : HttpClient) { }


  createProject(data : any) {
    console.log("ProjectService -> createProject -> data", data)

    try {
    return this.http.post(this.url + '/createProject', data);

    } catch (error) {

    console.log("ProjectService -> createProject -> error", error)

    }

  }

  getAllDataProject(){
   try {
     return this.http.get(this.url + '/getDataProject')

   } catch (error) {
   console.log("ProjectService -> getAllDataProject -> error", error)

   }
  }



}
