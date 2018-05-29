import { loadFirestore } from "../../util/firestore";

const firestore = loadFirestore();

export interface ITimeStamp {
  seconds: number;
  nanoseconds: number;
}

export interface ILatLng {
  latitude: number;
  longitude: number;
}

export interface IUnitDoc {
  batterylevel: number | null;
  lastUpdate: ITimeStamp;
  latlng: ILatLng;
  signalStrength: number;
  unitId: string;
}

export default class UnitService {
  static getDevices = async () => {
    const units: IUnitDoc[] = [];
    const unitsSnap = await firestore.collection("units").get();

    unitsSnap.forEach(unitDoc => {
      const unit = unitDoc.data() as IUnitDoc;
      units.push(unit);
    });

    return units;
  };
}
