import {ForecastDate} from './forecast.date';

export class ForecastMetaData {

  forecastStartDateTime: ForecastDate;
  forecastDuration: number;
  latDataCount: number;
  lonDataCount: number;
  leftBottomLatCoordinate: number;
  latStep: number;
  leftBottomLonCoordinate: number;
  lonStep: number;
}
