import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { InformationComponent } from './Information/information.component';
import { StudentRoutingModule } from './student-routing.module';
import { MatIconModule} from '@angular/material/icon';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import { CoursesComponent } from './courses/courses.component';
import { StudentLayoutComponent } from './student-layout/student-layout.component';
import { SidenavbarComponent } from './sidenavbar/sidenavbar.component';


@NgModule({
  declarations: [
    DetailsComponent,
    InformationComponent,
    CoursesComponent,
    SidenavbarComponent,
    StudentLayoutComponent
  ],
  imports: [
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    StudentRoutingModule,
    CommonModule,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class StudentModule { }
