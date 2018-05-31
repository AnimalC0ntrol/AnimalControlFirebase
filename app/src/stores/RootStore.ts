import { UnitStore } from "./UnitStore";
import { SessionStore } from "./SessionStore";
import { EventStore } from "./EventStore";
import { FakeStore } from "./FakeStore";

export class RootStore {
  unitStore: UnitStore;
  sessionStore: SessionStore;
  eventStore: EventStore;
  fakeStore: FakeStore;

  constructor() {
    this.unitStore = new UnitStore();
    this.sessionStore = new SessionStore();
    this.eventStore = new EventStore();
    this.fakeStore = new FakeStore();
  }
}
