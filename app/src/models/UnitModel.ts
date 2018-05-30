import { IUnitDoc } from "../stores/services/UnitService";
import { LatLngLiteral } from "leaflet";
import { convertTimestamp } from "../util/Common";
import { observable } from "mobx";

class UnitModel {
  unitId: string;
  readableId: number;
  position: LatLngLiteral;
  lastUpdate: string;
  timestamp: number;
  @observable isInAlertState: boolean;

  constructor(unitData: IUnitDoc) {
    this.unitId = unitData.unitId;
    this.readableId = Number(unitData.unitId.replace("ffffffff0000", ""));
    this.position = {
      lat: unitData.latlng.latitude,
      lng: unitData.latlng.longitude
    };
    this.lastUpdate = convertTimestamp(unitData.lastUpdate.seconds);
    this.timestamp = unitData.lastUpdate.seconds;
    this.isInAlertState = false;
  }
}

export { UnitModel };
