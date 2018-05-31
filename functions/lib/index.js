"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const EventController_1 = require("./EventController");
const app = express();
admin.initializeApp();
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post("/event", EventController_1.addEvent);
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map