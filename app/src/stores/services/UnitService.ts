import { loadFirestore } from "../../util/firestore";
import { EventModel } from "../../models/EventModel";
import { UnitModel } from "../../models/UnitModel";

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

export interface IEventDoc {
  centerPir: boolean;
  leftPir: boolean;
  rightPir: boolean;
  timestamp: ITimeStamp;
  unitId: string;
  uuid: string;
  uvLevel: string | null;
}

export class UnitService {
  static getDevices = async () => {
    const units: IUnitDoc[] = [];
    const unitsSnap = await firestore.collection("units").get();

    unitsSnap.forEach(unitDoc => {
      const unit = unitDoc.data() as IUnitDoc;
      units.push(unit);
    });

    return units;
  };

  static getDeviceEvents = async (unitId: number) => {
    const events: EventModel[] = [];

    try {
      const eventDocs = await firestore.collection("events").get();

      eventDocs.forEach(eventDoc => {
        const event = eventDoc.data() as IEventDoc;
        events.push(new EventModel(event));
      });
    } catch (error) {
      console.error(error);
    }

    return events;
  };

  static getUnitListener = (callback: (events: UnitModel[]) => void) => {
    return firestore.collection("units").onSnapshot(querySnap => {
      const units: UnitModel[] = [];
      querySnap.forEach(snap => {
        const unitDoc = snap.data() as IUnitDoc;
        const unit = new UnitModel(unitDoc);
        units.push(unit);
      });
      callback(units);
    });
  };

  static getEventListener = (
    unitId: string,
    callback: (events: EventModel[]) => void
  ) => {
    return firestore
      .collection("events")
      .where("unitId", "==", unitId)
      .onSnapshot(querySnap => {
        const events: EventModel[] = [];
        querySnap.forEach(snap => {
          const eventDoc = snap.data() as IEventDoc;
          const event = new EventModel(eventDoc);
          events.push(event);
        });
        callback(events);
      });
  };
}
