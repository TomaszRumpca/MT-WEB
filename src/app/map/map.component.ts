import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgmMap, MapsAPILoader} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';
import {HttpClient} from '@angular/common/http';
import {SeaportsTableItem} from '../seaports-table/seaports-table-datasource';
import {FormControl, Validators} from '@angular/forms';
import {ResolverService} from '../resolver.service';
import {ForecastService} from '../forecast.service';

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

  lat;
  lng;
  forecastMetaData;
  paths;
  solution;
  geocoder: any;

  @ViewChild(AgmMap) map: AgmMap;
  originControl = new FormControl('', [Validators.required]);
  destinationControl = new FormControl('', [Validators.required]);
  datePickerControl = new FormControl(new Date(), [Validators.required]);

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private http: HttpClient,
              private resolverService: ResolverService,
              private forecastService: ForecastService) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });

  }

  seaportOptions: SeaportsTableItem[] = [
    {id: 1, name: 'Fake1', waterway: 'balticsea', country: 'PL', city: 'Władysławowo', latitude: 49.198487, longitude: 13.684232},
    {id: 1, name: 'Fake2', waterway: 'balticsea', country: 'PL', city: 'Władysławowo', latitude: 50.017491, longitude: 15.196958},
    {id: 1, name: 'Port of Wladyslawowo', waterway: 'balticsea', country: 'PL', city: 'Władysławowo', latitude: 54.79, longitude: 18.40},
    {id: 2, name: 'Nørresand(Norresand) ', waterway: 'balticsea', country: 'DK', city: 'Havne', latitude: 55.21, longitude: 14.97},
    {id: 3, name: 'Port of Wolgast', waterway: 'balticsea', country: 'DE', city: 'Wolgast', latitude: 54.05, longitude: 13.78},
    {id: 4, name: 'Port of Ronehamn', waterway: 'balticsea', country: 'SW', city: 'Ronehamn', latitude: 57.17, longitude: 18.47},
    {id: 5, name: 'Port of Lubeck-travemunde', waterway: 'balticsea', country: 'DE', city: 'Lubeck', latitude: 53.97, longitude: 10.88}
  ];


  ngOnInit() {
    this.forecastService.getMetaData().subscribe(data => {
      this.forecastMetaData = data;
      this.lat = this.forecastMetaData.leftBottomLatCoordinate + (this.forecastMetaData.latStep * this.forecastMetaData.latDataCount / 2);
      this.lng = this.forecastMetaData.leftBottomLonCoordinate + (this.forecastMetaData.lonStep * this.forecastMetaData.lonDataCount / 2);
      this.paths = this.calculatePaths();
      console.log('forecast', this.forecastMetaData);
    }, error2 => {
      console.error('failed to fetch forecast metadata');
      this.forecastMetaData = undefined;
    });

    // this.seaports.connect().subscribe(data => {
    //   console.log('retrieved seaports options');
    //   this.seaportOptions = data;
    // }, error => {
    //   this.seaportOptions = null;
    // });

  }


  calculatePaths() {
    return [{
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
  }

  onSubmit() {
    this.resolverService.resolve(this.originControl.value, this.destinationControl.value, this.datePickerControl.value).subscribe(data => {
      this.solution = data['optimalPaths'][0];
      console.log('solution', this.solution);
    }, error2 => {
      console.log('failed to find solution', error2);
    });
  }
}
