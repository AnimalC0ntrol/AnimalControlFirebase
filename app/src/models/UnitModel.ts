import { IUnitDoc } from "../stores/services/UnitService";
import { LatLngLiteral } from "leaflet";
import { convertTimestamp } from "../util/Common";

class UnitModel {
  unitId: string;
  readableId: number;
  position: LatLngLiteral;
  lastUpdate: string;

  constructor(unitData: IUnitDoc) {
    this.unitId = unitData.unitId;
    this.readableId = Number(unitData.unitId.replace("ffffffff0000", ""));
    this.position = {
      lat: unitData.latlng.latitude,
      lng: unitData.latlng.longitude
    };
    this.lastUpdate = convertTimestamp(unitData.lastUpdate.seconds);
  }
}

export { UnitModel };
