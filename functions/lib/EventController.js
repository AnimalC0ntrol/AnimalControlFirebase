"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
const admin = require("firebase-admin");
exports.addEvent = (req, res) => {
    const eventJson = req.body;
    const db = admin.firestore();
    console.log("# Event Json", eventJson);
    if (!validFields(req.body)) {
        return res
            .status(400)
            .json({ success: false, error: "Missing fields in body." });
    }
    const unitDoc = {
        unitId: eventJson.dev_eui,
        batterylevel: undefined,
        lastUpdate: new Date(eventJson.motion_timestamp),
        latlng: {
            latidute: Number(eventJson.lat),
            longitude: Number(eventJson.lng)
        },
        signalStrength: eventJson.tcxn.cellular.rssi
    };
    const eventDoc = {
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
        if (!(value in body))
            return false;
    }
    return true;
};
//# sourceMappingURL=EventController.js.map