import {Component, OnInit, ViewChild} from '@angular/core';
import {ForecastService} from '../forecast.service';
import {MatListOption, MatSelectionList} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss']
})
export class ForecastsComponent implements OnInit {

  constructor(private forecastService: ForecastService) {
  }

  @ViewChild(MatSelectionList) forecastsDatesSelection: MatSelectionList;

  availableDates: string[] = [];
  cached = true;

  ngOnInit() {
    this.forecastsDatesSelection.selectedOptions = new SelectionModel<MatListOption>(false);
    this.requestDates();
  }

  requestDates() {
    this.forecastService.getAvailableDates(this.cached).subscribe((data: string[]) => {
      this.availableDates = data;
    }, error => {
      console.error('failed to fetch forecast dates');
      this.availableDates = [];
    });
  }

}
