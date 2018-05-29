import { observable, action, computed } from "mobx";
import UnitService from "./services/UnitService";
import { UnitModel } from "../models/UnitModel";
import * as geolib from "geolib";
import { LatLngLiteral } from "leaflet";

export class UnitStore {
  @observable units: UnitModel[] = [];
  @observable isLoading: boolean;

  @action
  getUnits = async () => {
    if (!this.units.length) {
      this.startLoading();
    }
    const unitsData = await UnitService.getDevices();
    const units = unitsData.map(unitData => new UnitModel(unitData));
    this.units = units;
    this.stopLoading();
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
  private startLoading = () => {
    this.isLoading = true;
  };

  @action
  private stopLoading = () => {
    this.isLoading = false;
  };
}
