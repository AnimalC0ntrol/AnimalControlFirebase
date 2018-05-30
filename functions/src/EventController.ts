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

export const addEvent = (req: Request, res: Response) => {
  const eventJson = req.body as ITelenorEvent;
  const db = admin.firestore();

  console.log("# Event Json", eventJson);

  if (!validFields(req.body)) {
    return res
      .status(400)
      .json({ success: false, error: "Missing fields in body." });
  }

  const unitDoc: IUnitDoc = {
    unitId: eventJson.dev_eui,
    batterylevel: undefined,
    lastUpdate: new Date(eventJson.motion_timestamp),
    latlng: {
      latidute: Number(eventJson.lat),
      longitude: Number(eventJson.lng)
    },
    signalStrength: eventJson.tcxn.cellular.rssi
  };

  const eventDoc: IEventDoc = {
    uuid: shortid.generate(),
    centerPir: !!eventJson.center,
    leftPir: !!eventJson.left,
    rightPir: !!eventJson.right,
    timestamp: new Date(eventJson.motion_timestamp),
    unitId: eventJson.dev_eui,
    uvLevel: eventJson.uv
  };

  console.log("# Computed:", unitDoc, eventDoc);

  db
    .collection("units")
    .doc(unitDoc.unitId)
    .set(unitDoc)
    .catch(error => {
      console.error(error);
      return res.status(503).json({ success: false, error });
    });

  db
    .collection("events")
    .doc(eventDoc.uuid)
    .set(eventDoc)
    .catch(error => {
      console.error(error);
      return res.status(503).json({ success: false, error });
    });

  return res.status(200).json({ ok: "Works fine :)" });
};

const validFields = body => {
  const validPresentValues = [
    "lat",
    "lng",
    "motion",
    "motion_timestamp",
    "dev_eui"
  ];

  for (let value of validPresentValues) {
    if (!(value in body)) return false;
  }

  return true;
};
