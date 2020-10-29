import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule) },
  { path: 'jobtype', loadChildren: () => import('./jobtype/jobtype.module').then(m => m.JobtypeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
