import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {AgmMap, MapsAPILoader} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core/services';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResolverService} from '../resolver.service';
import {ForecastService} from '../forecast.service';
import {SeaportService} from '../seaport.service';

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
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
  seaports;

  displayedSolutionColumns = ['latitude', 'longitude'];

  @ViewChild(AgmMap) map: AgmMap;

  originControl = new FormControl('', [Validators.required]);
  destinationControl = new FormControl('', [Validators.required]);
  datePickerControl = new FormControl(new Date(), [Validators.required]);
  cachedControl = new FormControl(true);

  tripDetailsForm: FormGroup;

  constructor(public mapsApiLoader: MapsAPILoader,
              private zone: NgZone,
              private wrapper: GoogleMapsAPIWrapper,
              private http: HttpClient,
              private resolverService: ResolverService,
              private forecastService: ForecastService,
              private seaportService: SeaportService,
              private formBuilder: FormBuilder) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });

  }

  // convenience getter for easy access to form fields
  get f() {
    return this.tripDetailsForm.controls;
  }

  ngOnInit() {
    this.tripDetailsForm = this.formBuilder.group({
      originControl: this.originControl,
      destinationControl: this.destinationControl,
      datePickerControl: this.datePickerControl,
      cachedControl: this.cachedControl
    });

    this.drawForecastRange();

    this.seaportService.getAll().subscribe(response => {
      this.seaports = response;
    }, error2 => {
      console.log('failed to load seaports', error2);
    });
  }

  private drawForecastRange() {
    this.forecastService.getMetaData(this.f.cachedControl.value, this.f.datePickerControl.value).subscribe(data => {
      this.forecastMetaData = data;
      this.lat = this.forecastMetaData.leftBottomLatCoordinate + (this.forecastMetaData.latStep * this.forecastMetaData.latDataCount / 2);
      this.lng = this.forecastMetaData.leftBottomLonCoordinate + (this.forecastMetaData.lonStep * this.forecastMetaData.lonDataCount / 2);
      this.paths = this.calculatePaths();
      console.log('forecast', this.forecastMetaData);
    }, error2 => {
      console.error('failed to fetch forecast metadata');
      this.forecastMetaData = undefined;
    });
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
    if (this.tripDetailsForm.valid) {
      this.resolverService.resolve(this.f.originControl.value,
        this.f.destinationControl.value,
        this.f.datePickerControl.value,
        this.f.cachedControl.value)
        .subscribe(data => {
          this.solution = data['optimalPaths'][0];
          console.log('solution', this.solution);
        }, error2 => {
          console.log('failed to find solution', error2);
        });
    }
  }
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
