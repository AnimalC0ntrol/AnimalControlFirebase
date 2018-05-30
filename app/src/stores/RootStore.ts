import { UnitStore } from "./UnitStore";
import { SessionStore } from "./SessionStore";
import { EventStore } from "./EventStore";

export class RootStore {
  unitStore: UnitStore;
  sessionStore: SessionStore;
  eventStore: EventStore;

  constructor() {
    this.unitStore = new UnitStore();
    this.sessionStore = new SessionStore();
    this.eventStore = new EventStore();
  }
}
