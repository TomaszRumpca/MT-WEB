import {Component, Input, ViewChild, NgZone, OnInit} from '@angular/core';
import {MapsAPILoader, AgmMap} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';
import {HttpClient} from '@angular/common/http';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  marker?: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  lat = 51.678418;
  lng = 7.809007;

  circleRadius = 5000; // km
  geocoder: any;
  public location: Location = {
    lat: 51.678418,
    lng: 7.809007,
    marker: {
      lat: 51.678418,
      lng: 7.809007,
      draggable: true
    },
    zoom: 5
  };

  forecastMetaData = {
    forecastStartDateTime: {
      month: 'MAY',
      year: 2016,
      dayOfMonth: 1,
      dayOfWeek: 'SUNDAY',
      dayOfYear: 122,
      hour: 0,
      minute: 0,
      nano: 0,
      second: 0,
      monthValue: 5,
      chronology: {
        id: 'ISO',
        calendarType: 'iso8601'
      }
    },
    forecastDuration: 49,
    latDataCount: 3,
    lonDataCount: 4,
    leftBottomLatCoordinate: 48.802824,
    latStep: 0.5378444945891919,
    leftBottomLonCoordinate: 13.236774,
    lonStep: 0.5378444945891919
  };

  paths = [{
    lat: this.forecastMetaData.leftBottomLatCoordinate,
    lng: this.forecastMetaData.leftBottomLonCoordinate
  },
    {
      lat: this.forecastMetaData.leftBottomLatCoordinate,
      lng: this.forecastMetaData.leftBottomLonCoordinate + (this.forecastMetaData.lonStep * this.forecastMetaData.lonDataCount)
    },
    {
      lat: this.forecastMetaData.leftBottomLatCoordinate + (this.forecastMetaData.latStep * this.forecastMetaData.latDataCount),
      lng: this.forecastMetaData.leftBottomLonCoordinate + (this.forecastMetaData.lonStep * this.forecastMetaData.lonDataCount)
    },
    {
      lat: this.forecastMetaData.leftBottomLatCoordinate + (this.forecastMetaData.latStep * this.forecastMetaData.latDataCount),
      lng: this.forecastMetaData.leftBottomLonCoordinate
    },
    {
      lat: this.forecastMetaData.leftBottomLatCoordinate,
      lng: this.forecastMetaData.leftBottomLonCoordinate
    }
  ];

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private http: HttpClient) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });

  }


  ngOnInit() {
    this.location.marker.draggable = true;

  }

}
