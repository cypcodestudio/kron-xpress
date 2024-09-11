import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import cronstrue from 'cronstrue';

// TODO: Replace this with your own data model type
export interface ScheduleListItem {
  name: string;
  id: number;
  service: string;
  schedule: string;
  cron: string;
  link: string;
  enabled: boolean;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ScheduleListItem[] = [
  {id: 1, name: 'report-job', service: 'report-microservice', schedule: cronstrue.toString("* * * * *"), cron: '* * * * *', link: 'https://github.com/cypcodestudio/report-microservice', enabled: true},
  {id: 2, name: 'kafka-job', service: 'kafka-microservice', schedule: cronstrue.toString("0 2 * * *"), cron: '0 2 * * *', link: 'https://github.com/cypcodestudio/kafka-microservice', enabled: false},
  {id: 3, name: 'notifications-job', service: 'notifications-microservice', schedule: cronstrue.toString("0 0 12 1 1/1 ? *"), cron: '0 0 12 1 1/1 ? *', link: 'http://localhost:4200/', enabled: true},
  {id: 4, name: 'push-job', service: 'push-microservice', schedule: cronstrue.toString("0 0 0 1 8 ? *"), cron: '0 0 0 1 8 ? *', link: 'http://localhost:4200/', enabled: true},
];

/**
 * Data source for the ScheduleList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ScheduleListDataSource extends DataSource<ScheduleListItem> {
  data: ScheduleListItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ScheduleListItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ScheduleListItem[]): ScheduleListItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ScheduleListItem[]): ScheduleListItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
