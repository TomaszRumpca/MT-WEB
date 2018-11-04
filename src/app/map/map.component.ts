import {Component, Input, ViewChild, NgZone, OnInit} from '@angular/core';
import {MapsAPILoader, AgmMap} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';
import {HttpClient} from '@angular/common/http';
import {SeaportsTableItem} from '../seaports-table/seaports-table-datasource';
import {FormControl, Validators} from '@angular/forms';
import {ResolverService} from '../resolver.service';

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
  originControl = new FormControl('', [Validators.required]);
  destinationControl = new FormControl('', [Validators.required]);
  datePickerControl = new FormControl(new Date(), [Validators.required]);

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private http: HttpClient,
              private resolverService: ResolverService) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });

  }

  seaportOptions: SeaportsTableItem[] = [
    {id: 1, name: 'Port of Wladyslawowo', waterway: 'balticsea', country: 'PL', city: 'Władysławowo', latitude: 54.79, longitude: 18.40},
    {id: 2, name: 'Nørresand(Norresand) ', waterway: 'balticsea', country: 'DK', city: 'Havne', latitude: 55.21, longitude: 14.97},
    {id: 3, name: 'Port of Wolgast', waterway: 'balticsea', country: 'DE', city: 'Wolgast', latitude: 54.05, longitude: 13.78},
    {id: 4, name: 'Port of Ronehamn', waterway: 'balticsea', country: 'SW', city: 'Ronehamn', latitude: 57.17, longitude: 18.47},
    {id: 5, name: 'Port of Lubeck-travemunde', waterway: 'balticsea', country: 'DE', city: 'Lubeck', latitude: 53.97, longitude: 10.88}
  ];


  ngOnInit() {
    this.location.marker.draggable = true;

    // this.seaports.connect().subscribe(data => {
    //   console.log('retrieved seaports options');
    //   this.seaportOptions = data;
    // }, error => {
    //   this.seaportOptions = null;
    // });

  }

  onSubmit() {
    console.log('submitted: ', this.originControl, this.destinationControl, this.datePickerControl);

    this.resolverService.resolve(this.originControl.value, this.destinationControl.value, this.datePickerControl.value).subscribe(data => {
      console.log('solution', data);
    }, error2 => {
      console.log('failed to find solution', error2);
    });

  }
}
