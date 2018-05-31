import * as geolib from "geolib";
import { observable, action, computed } from "mobx";
import { LatLngLiteral } from "leaflet";
import { UnitService } from "./services/UnitService";
import { UnitModel } from "../models/UnitModel";

export class UnitStore {
  unitListener: any;
  @observable units: UnitModel[] = [];
  @observable isLoading: boolean;

  constructor() {
    setInterval(this.checkUnitState, 10000);
  }

  @action
  getUnits = async () => {
    if (!this.units.length) {
      this.startLoading();
    }
    this.unitListener = UnitService.getUnitListener(this.saveUnits);
  };

  @action
  stopUnitListener = () => {
    if (this.unitListener) {
      this.unitListener();
    }
  };

  @computed
  get averageLocation() {
    let center: LatLngLiteral = {
      lat: 0,
      lng: 0
    };
    if (this.units.length) {
      const postions = this.units.map(unit => ({
        latitude: unit.position.lat,
        longitude: unit.position.lng
      }));

      const geolibCenter = geolib.getCenter(postions);

      center = {
        lat: geolibCenter.latitude,
        lng: geolibCenter.longitude
      };
    }
    return center;
  }

  @action
  private saveUnits = (units: UnitModel[]) => {
    this.units = units;
    this.checkUnitState();
    this.stopLoading();
  };

  @action
  private startLoading = () => {
    this.isLoading = true;
  };

  @action
  private stopLoading = () => {
    this.isLoading = false;
  };

  @action
  private checkUnitState = () => {
    const time = Date.now();

    this.units.forEach(unit => {
      const timeDelta = time / 1000 - unit.timestamp;
      if (timeDelta < 30) {
        unit.isInAlertState = true;
      } else {
        unit.isInAlertState = false;
      }
    });
  };
}
