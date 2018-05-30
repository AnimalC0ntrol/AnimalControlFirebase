import { loadFirestore } from "../../util/firestore";
import { EventModel } from "../../models/EventModel";

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
  centerPir: string | null;
  leftPir: string | null;
  rightPir: string | null;
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

  static getUnitListener = async () => {
    return firestore.collection("units");
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
