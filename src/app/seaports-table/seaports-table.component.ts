import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {SeaportsTableDataSource} from './seaports-table-datasource';
import {SeaportService} from '../seaport.service';

@Component({
  selector: 'app-seaports-table',
  templateUrl: './seaports-table.component.html',
  styleUrls: ['./seaports-table.component.scss'],
})
export class SeaportsTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private seaportService: SeaportService) {
  }

  dataSource: SeaportsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'waterway', 'city', 'country', 'latitude', 'longitude'];

  ngOnInit() {
    this.dataSource = new SeaportsTableDataSource(this.paginator, this.sort, this.seaportService);
  }
}
