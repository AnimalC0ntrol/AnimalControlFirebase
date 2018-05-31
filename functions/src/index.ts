import * as functions from "firebase-functions";
import * as express from "express";
import * as admin from "firebase-admin";
import * as bodyParser from "body-parser";
import { addEvent } from "./EventController";

const app = express();

admin.initializeApp();

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/event", addEvent);

exports.api = functions.https.onRequest(app);
