import * as geolib from "geolib";
import { observable, action, computed } from "mobx";
import { LatLngLiteral } from "leaflet";
import { UnitService } from "./services/UnitService";
import { UnitModel } from "../models/UnitModel";
import { EventModel } from "../models/EventModel";

export class UnitStore {
  @observable units: UnitModel[] = [];
  @observable isLoading: boolean;
  @observable selectedUnit?: UnitModel;
  @observable unitEvents: EventModel[];

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

  @action
  getUnitEvents = async (unitId: number) => {
    const unitEvents = await UnitService.getDeviceEvents();
    this.unitEvents = unitEvents;
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
