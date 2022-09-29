import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InformationComponent } from './Information/information.component';
import { DetailsComponent } from './details/details.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'information', 
    pathMatch: 'full' 
  },
  { 
    path: 'information', 
    component: InformationComponent 
  },
  { 
    path: 'details', 
    component: DetailsComponent 
  },
  { 
    path: 'courses', 
    component: CoursesComponent 
  },
  
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class StudentRoutingModule { }
