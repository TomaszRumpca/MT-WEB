import {WindVector} from "./wind.vector";
import {Coordinates} from "./coordinates";

export class WindSpot {

  constructor(public coordinates: Coordinates, public wind: WindVector) {}
}
