import * as functions from 'firebase-functions';
import * as express from "express"
import * as admin from "firebase-admin"
import * as bodyParser from "body-parser"
import { addEvent } from './EventController';

const app = express()

admin.initializeApp()

app.use(bodyParser.json())

app.post('/event', addEvent)

exports.api = functions.https.onRequest(app)