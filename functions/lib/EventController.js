"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid = require("shortid");
const admin = require("firebase-admin");
exports.addEvent = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const eventJson = req.body;
    const db = admin.firestore();
    if (!validFields(req.body)) {
        return res
            .status(400)
            .json({ success: false, error: "Missing fields in body." });
    }
    const unitDoc = {
        unitId: eventJson.dev_eui,
        batterylevel: null,
        lastUpdate: new Date(eventJson.motion_timestamp),
        latlng: {
            latitude: 69.681098,
            longitude: 18.976624
        },
        signalStrength: eventJson.tcxn.cellular.rssi
    };
    const eventDoc = {
        uuid: shortid.generate(),
        centerPir: eventJson.motion_center === "1" ? true : false,
        leftPir: eventJson.motion_left === "1" ? true : false,
        rightPir: eventJson.motion_right === "1" ? true : false,
        timestamp: new Date(eventJson.motion_timestamp),
        unitId: eventJson.dev_eui
    };
    try {
        yield db
            .collection("units")
            .doc(unitDoc.unitId)
            .update(unitDoc);
        yield db
            .collection("events")
            .doc(eventDoc.uuid)
            .set(eventDoc);
    }
    catch (error) {
        console.error(error);
        return res.status(503).json({ success: false, error });
    }
    console.log("# Event saved");
    return res.status(200).json({ success: true });
});
const validFields = body => {
    const validPresentValues = ["lat", "lng", "center_motion", "dev_eui"];
    for (let value of validPresentValues) {
        if (!(value in body))
            return false;
    }
    return true;
};
//# sourceMappingURL=EventController.js.map