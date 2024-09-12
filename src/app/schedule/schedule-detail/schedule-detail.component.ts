import { AfterViewInit, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import cronstrue from 'cronstrue';
import { DialogService } from '../../common/service/dialog.service';
import { ScheduleListComponent } from '../schedule-list/schedule-list.component';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrl: './schedule-detail.component.css'
})
export class ScheduleDetailComponent implements AfterViewInit{

  jobName: any;
  serviceName: any;
  serviceLink: any;
  cron: any;
  cronExpression: any;
  second: any;
  minute: any;
  hour: any;
  monthday: any;
  month: any;
  weekday: any;
  year: any;
  schedulerDto: any;
  
  constructor(public dialog: DialogService,
    @Optional() public dialogRef: MatDialogRef<ScheduleListComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data !== null) {
       this.schedulerDto = this.data.entity as any;   
    }
  }

  ngAfterViewInit(): void {
    if (this.schedulerDto !== null || this.schedulerDto !== undefined) {
      this.jobName = this.schedulerDto.name;
      this.serviceName = this.schedulerDto.service;
      this.serviceLink = this.schedulerDto.link;
      this.cronExpression = this.schedulerDto.cron;
      this.updateDatesByExpressionStr(this.cronExpression);
    }
  }
  updateCronByField(){
    let expression = this.second + " " + this.minute + " " + this.hour + " " + this.monthday + " " + this.month + " " + this.weekday + " " + this.year; 
    this.cronExpression = expression;
    this.cron = cronstrue.toString(expression);
  }

  updateDatesByExpression(expression: Event){
    
    const actual = (expression.target as HTMLInputElement).value;
    let splitExpression = actual.split(" ");
    
    this.second = splitExpression.at(0);
    this.minute = splitExpression.at(1);
    this.hour = splitExpression.at(2);
    this.monthday = splitExpression.at(3);
    this.month = splitExpression.at(4);
    this.weekday = splitExpression.at(5);
    this.year = splitExpression.at(6);

    this.cron = cronstrue.toString(actual);
  }

  updateDatesByExpressionStr(expression: string){
    let splitExpression = expression.split(" ");
    
    this.second = splitExpression.at(0);
    this.minute = splitExpression.at(1);
    this.hour = splitExpression.at(2);
    this.monthday = splitExpression.at(3);
    this.month = splitExpression.at(4);
    this.weekday = splitExpression.at(5);
    this.year = splitExpression.at(6);

    this.cron = cronstrue.toString(expression);
  }
  saveJob(){
    this.dialog.alert("Service not yet implemented.");
  }
}
