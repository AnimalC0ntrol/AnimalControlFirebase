import { IEventDoc } from "../stores/services/UnitService";
import { convertTimestamp } from "../util/Common";

class EventModel {
  centerPir: boolean;
  leftPir: boolean;
  rightPir: boolean;
  timestamp: string;
  unitId: number;
  uuid: string;
  uvLevel?: string;

  constructor(eventDoc: IEventDoc) {
    this.centerPir = !!eventDoc.centerPir;
    this.leftPir = !!eventDoc.leftPir;
    this.rightPir = !!eventDoc.rightPir;
    this.timestamp = convertTimestamp(eventDoc.timestamp.seconds);
    this.unitId = Number(eventDoc.unitId);
    this.uvLevel = eventDoc.uvLevel ? eventDoc.uvLevel : undefined;
  }
}

export { EventModel };
