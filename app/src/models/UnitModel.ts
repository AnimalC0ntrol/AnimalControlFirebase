import { IUnitDoc } from "../stores/services/UnitService";
import * as moment from "moment";
import { LatLngLiteral } from "leaflet";

class UnitModel {
  unitId: number;
  position: LatLngLiteral;
  lastUpdate: Date;

  constructor(unitData: IUnitDoc) {
    this.unitId = Number(unitData.unitId.replace("ffffffff0000", ""));
    this.position = {
      lat: unitData.latlng.latitude,
      lng: unitData.latlng.longitude
    };
    // @ts-ignore
    this.lastUpdate = moment
      .unix(unitData.lastUpdate.seconds)
      .format("MMMM Do YYYY, h:mm:ss a");
  }
}

export { UnitModel };
