import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ScheduleListDataSource, ScheduleListItem } from './schedule-list-datasource';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
  _MatSlideToggleRequiredValidatorModule,
} from '@angular/material/slide-toggle';
import { DialogService } from '../../common/service/dialog.service';
import { ScheduleDetailComponent } from '../schedule-detail/schedule-detail.component';

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css'
})
export class ScheduleListComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ScheduleListItem>;
  dataSource = new ScheduleListDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'service', 'schedule', 'cron', 'enabled', 'action'];

  constructor(private dialog: DialogService){}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  updateJob(row: any, event: any){
    row.enabled = event.checked;
    if(row.enabled){

      this.dialog.alert("Job: " + row.name + " started for service: " + row.service);
    }else{

    this.dialog.alert("Job: " + row.name + " stopped for service: " + row.service);
    }
  }

  addJob(){
    this.dialog.modal(ScheduleDetailComponent, null);
  }

  editJob(row: any){
    this.dialog.modal(ScheduleDetailComponent, row);
  }
}
