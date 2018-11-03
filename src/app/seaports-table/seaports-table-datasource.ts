import {DataSource} from '@angular/cdk/collections';
import {MatPaginator, MatSort} from '@angular/material';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {SeaportService} from '../seaport.service';

export interface SeaportsTableItem {
  id: number;
  waterway: string;
  name: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
}

// const EXAMPLE_DATA: SeaportsTableItem[] = [
//   {id: 1, name: 'Port of Wladyslawowo', waterway: 'balticsea', country: 'PL', city: 'Władysławowo', latitude: 54.79, longitude: 18.40},
//   {id: 2, name: 'Nørresand(Norresand) ', waterway: 'balticsea', country: 'DK', city: 'Havne', latitude: 55.21, longitude: 14.97},
//   {id: 3, name: 'Port of Wolgast', waterway: 'balticsea', country: 'DE', city: 'Wolgast', latitude: 54.05, longitude: 13.78},
//   {id: 4, name: 'Port of Ronehamn', waterway: 'balticsea', country: 'SW', city: 'Ronehamn', latitude: 57.17, longitude: 18.47},
//   {id: 5, name: 'Port of Lubeck-travemunde', waterway: 'balticsea', country: 'DE', city: 'Lubeck', latitude: 53.97, longitude: 10.88}
// ];

/**
 * Data source for the SeaportsTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SeaportsTableDataSource extends DataSource<SeaportsTableItem> {

  // data: SeaportsTableItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort, private seaportService: SeaportService) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<SeaportsTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    // const dataMutations = [
    //   this.seaportService.getAll(),
    //   this.paginator.page,
    //   this.sort.sortChange
    // ];
    //
    // Set the paginator's length
    // this.paginator.length = 5;
    //
    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData();
    // }));
    return this.seaportService.getAll();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  // private getPagedData(data: SeaportsTableItem[]) {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   return data.splice(startIndex, this.paginator.pageSize);
  // }


}

