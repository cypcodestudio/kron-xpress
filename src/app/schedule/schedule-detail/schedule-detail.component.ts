import { Component } from '@angular/core';
import cronstrue from 'cronstrue';

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrl: './schedule-detail.component.css'
})
export class ScheduleDetailComponent {

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

  saveJob(){

  }
}
