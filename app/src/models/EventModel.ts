import { IEventDoc } from "../stores/services/UnitService";
import { convertTimestamp } from "../util/Common";

class EventModel {
  centerPir: boolean;
  leftPir: boolean;
  rightPir: boolean;
  timestamp: string;
  unitId: string;
  readableId: number;
  uuid: string;
  uvLevel?: string;
  timestampSeconds: number;

  constructor(eventDoc: IEventDoc) {
    this.centerPir = eventDoc.centerPir === "1" ? true : false;
    this.leftPir = eventDoc.leftPir === "1" ? true : false;
    this.rightPir = !!eventDoc.rightPir;
    this.timestamp = convertTimestamp(eventDoc.timestamp.seconds);
    this.timestampSeconds = eventDoc.timestamp.seconds;
    this.unitId = eventDoc.unitId;
    this.uvLevel = eventDoc.uvLevel ? eventDoc.uvLevel : undefined;
    this.readableId = Number(eventDoc.unitId.replace("ffffffff0000", ""));
  }
}

export { EventModel };
