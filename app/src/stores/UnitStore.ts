import { observable, action } from "mobx";
import UnitService from "./services/UnitService";

export class UnitStore {
  @observable units = []

  @action
  getUnits = async () => {
    const units = await UnitService.getDevices()
    this.units = units
  }

}