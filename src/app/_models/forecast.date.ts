import {ForecastChronology} from './forecast.chronology';

export class ForecastDate {
  month: string;
  year: number;
  dayOfMonth: number;
  dayOfWeek: string;
  dayOfYear: number;
  hour: number;
  minute: number;
  nano: number;
  second: number;
  monthValue: number;
  chronology: ForecastChronology;
}
