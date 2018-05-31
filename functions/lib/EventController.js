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
    const DATABASE = admin.firestore();
    const eventJson = req.body;
    console.log("#Payload | ", eventJson);
    const unitDoc = {
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
    const eventDoc = {
        uuid: shortid.generate(),
        centerPir: eventJson.motion_center === "1" ? true : false,
        leftPir: eventJson.motion_left === "1" ? true : false,
        rightPir: eventJson.motion_right === "1" ? true : false,
        timestamp: new Date(eventJson.motion_timestamp),
        unitId: eventJson.dev_eui
    };
    try {
        const exists = yield checkIfDeviceExists(unitDoc.unitId);
        if (exists) {
            yield updateDevice(unitDoc);
        }
        else {
            yield createDevice(unitDoc);
        }
        yield createEvent(eventDoc);
    }
    catch (error) {
        console.error(error);
        return res.status(503).json({ success: false, error });
    }
    console.log("# Event saved | ", eventDoc.uuid);
    return res.status(200).json({ success: true });
});
const createEvent = (event) => __awaiter(this, void 0, void 0, function* () {
    const DATABASE = admin.firestore();
    yield DATABASE.collection("events")
        .doc(event.uuid)
        .set(event);
});
const checkIfDeviceExists = (unitId) => __awaiter(this, void 0, void 0, function* () {
    const DATABASE = admin.firestore();
    try {
        const result = yield DATABASE.collection("units")
            .doc(unitId)
            .get();
        return result.exists;
    }
    catch (error) {
        console.error("# ERROR | checkIfDeviceExists | ", error);
        return false;
    }
});
const createDevice = (unitDoc) => __awaiter(this, void 0, void 0, function* () {
    const DATABASE = admin.firestore();
    yield DATABASE.collection("units")
        .doc(unitDoc.unitId)
        .set(unitDoc);
});
const updateDevice = (unitDoc) => __awaiter(this, void 0, void 0, function* () {
    const DATABASE = admin.firestore();
    yield DATABASE.collection("units")
        .doc(unitDoc.unitId)
        .update(unitDoc);
});
//# sourceMappingURL=EventController.js.map