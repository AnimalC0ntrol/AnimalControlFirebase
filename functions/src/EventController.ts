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
  const eventJson = req.body as ITelenorEvent;
  const db = admin.firestore();

  if (!validFields(req.body)) {
    return res
      .status(400)
      .json({ success: false, error: "Missing fields in body." });
  }

  const unitDoc: IUnitDoc = {
    unitId: eventJson.dev_eui,
    batterylevel: null,
    lastUpdate: new Date(eventJson.motion_timestamp),
    // Hard coded coords since our GPS device got fried :'(
    latlng: {
      latitude: 69.681098,
      longitude: 18.976624
    },
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
    await db
      .collection("units")
      .doc(unitDoc.unitId)
      .update(unitDoc);
    await db
      .collection("events")
      .doc(eventDoc.uuid)
      .set(eventDoc);
  } catch (error) {
    console.error(error);
    return res.status(503).json({ success: false, error });
  }

  console.log("# Event saved");

  return res.status(200).json({ success: true });
};

const validFields = body => {
  const validPresentValues = ["lat", "lng", "center_motion", "dev_eui"];

  for (let value of validPresentValues) {
    if (!(value in body)) return false;
  }

  return true;
};
