import { action } from "mobx";
import axios from "axios";
import { loadFirestore } from "../util/firestore";

const firestore = loadFirestore();

interface ITelenorEvent {
  dev_eui: string; // Unit id
  motion_timestamp: string;
  lat: string;
  lng: string;
  motion_center: string | null;
  motion_left: string | null;
  motion_right: string | null;
  tcxn: {
    cellular: {
      rssi: number;
    };
  };
}

export enum PirLocation {
  LEFT,
  CENTER,
  RIGHT
}

const API_URL =
  "http://us-central1-animalcontrol-58410.cloudfunctions.net/api/event";

class FakeStore {
  @action
  fakeFirstBoot = async () => {
    const initEvent: ITelenorEvent = {
      dev_eui: "ffffffff00001337",
      lat: "69.674130",
      lng: "19.008669",
      motion_center: "1",
      motion_left: "1",
      motion_right: "1",
      motion_timestamp: new Date().toUTCString(),
      tcxn: { cellular: { rssi: 50 } }
    };

    try {
      await axios.post(API_URL, initEvent);
    } catch (error) {
      console.error(error);
    }
  };

  @action
  fakeAlert = async (pir: PirLocation) => {
    const initEvent: ITelenorEvent = {
      dev_eui: "ffffffff00001337",
      lat: "69.674130",
      lng: "19.008669",
      motion_center: pir === PirLocation.CENTER ? "1" : "0",
      motion_left: pir === PirLocation.LEFT ? "1" : "0",
      motion_right: pir === PirLocation.RIGHT ? "1" : "0",
      motion_timestamp: new Date().toUTCString(),
      tcxn: { cellular: { rssi: 50 } }
    };

    try {
      await axios.post(API_URL, initEvent);
    } catch (error) {
      console.error(error);
    }
  };

  @action
  removeFakeUnit = async () => {
    const fakeEventId = "ffffffff00001337";

    await firestore
      .collection("units")
      .doc(fakeEventId)
      .delete();
    const foundEvents = await firestore
      .collection("events")
      .where("unitId", "==", fakeEventId)
      .get();

    const batch = firestore.batch();

    foundEvents.forEach(event => {
      batch.delete(event.ref);
    });

    await batch.commit();
    console.log("Removed simulated unit");
  };
}

export { FakeStore };
