"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
exports.addEvent = (req, res) => {
    const event = req.body;
    const db = admin.firestore();
    console.log(event);
    if (!validFields(req.body)) {
        return res
            .status(400)
            .json({ success: false, error: "Missing fields in body." });
    }
    /*const uniqueId = shortid.generate();
  
    const unitData = {
      unitId: event.dev_eui,
      batterylevel: null,
      latlng: {
        latitude: event.lat,
        longitude: event.lng
      },
      lastUpdate: current_timestamp,
      signalStrength: event.tcxn.cellular.rssi
    };
  
    const eventData = {
      uuid: uniqueId,
      unitId: event.dev_eui,
      timestamp: current_timestamp,
      leftPir: null,
      centerPir: event.motion,
      rightPir: null,
      uvLevel: null
    };
  
    db
      .collection("units")
      .doc(event.dev_eui)
      .set(unitData)
      .catch(error => {
        console.error(error);
        return res.status(503).json({ success: false, error });
      });
  
    db
      .collection("events")
      .doc(epock)
      .set(eventData)
      .catch(error => {
        console.error(error);
        return res.status(503).json({ success: false, error });
      });
  
    return res.status(201).json({ succes: true });*/
    return res.status(200).json({ ok: "Works fine :)" });
};
const validFields = (body) => {
    const validPresentValues = [
        "lat",
        "lng",
        "motion",
        "motion_timestamp",
        "dev_eui"
    ];
    for (let value of validPresentValues) {
        if (!(value in body))
            return false;
    }
    return true;
};
//# sourceMappingURL=EventController.js.map