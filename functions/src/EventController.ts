import { Request, Response } from "express";
import * as shortid from "shortid";
import * as admin from "firebase-admin";
import { ITelenorEvent, IUnitDoc, IEventDoc } from "./Event";

interface IEvent {
  motion_timestamp: Date;
  motion_left: number;
  motion_center: number;
  motion_right: number;
  position: {
    lat: number;
    lng: number;
  };
  uv: number;
}

export const addEvent = async (req: Request, res: Response) => {
  const DATABASE = admin.firestore();
  const eventJson = req.body as ITelenorEvent;
  console.log("#Payload | ", eventJson);

  const pos = {
    latitude: Number(eventJson.lat) < 90 ? Number(eventJson.lat) : 69.676392,
    longitude: Number(eventJson.lat) < 90 ? Number(eventJson.lat) : 19.003542
  };

  const unitDoc: IUnitDoc = {
    unitId: eventJson.dev_eui,
    batterylevel: null,
    lastUpdate: new Date(eventJson.motion_timestamp),
    // Hard coded coords since our GPS device got fried :'(
    latlng: pos,
    signalStrength: eventJson.tcxn.cellular.rssi
  };

  const eventDoc: IEventDoc = {
    uuid: shortid.generate(),
    centerPir: eventJson.motion_center === "1" ? true : false,
    leftPir: eventJson.motion_left === "1" ? true : false,
    rightPir: eventJson.motion_right === "1" ? true : false,
    timestamp: new Date(eventJson.motion_timestamp),
    unitId: eventJson.dev_eui
  };

  try {
    const exists = await checkIfDeviceExists(unitDoc.unitId);
    if (exists) {
      await updateDevice(unitDoc);
    } else {
      await createDevice(unitDoc);
    }
    await createEvent(eventDoc);
  } catch (error) {
    console.error(error);
    return res.status(503).json({ success: false, error });
  }

  console.log("# Event saved | ", eventDoc.uuid);

  return res.status(200).json({ success: true });
};

const createEvent = async (event: IEventDoc) => {
  const DATABASE = admin.firestore();
  await DATABASE.collection("events")
    .doc(event.uuid)
    .set(event);
};

const checkIfDeviceExists = async unitId => {
  const DATABASE = admin.firestore();
  try {
    const result = await DATABASE.collection("units")
      .doc(unitId)
      .get();
    return result.exists;
  } catch (error) {
    console.error("# ERROR | checkIfDeviceExists | ", error);
    return false;
  }
};

const createDevice = async (unitDoc: IUnitDoc) => {
  const DATABASE = admin.firestore();
  await DATABASE.collection("units")
    .doc(unitDoc.unitId)
    .set(unitDoc);
};

const updateDevice = async (unitDoc: IUnitDoc) => {
  const DATABASE = admin.firestore();
  await DATABASE.collection("units")
    .doc(unitDoc.unitId)
    .update(unitDoc);
};
