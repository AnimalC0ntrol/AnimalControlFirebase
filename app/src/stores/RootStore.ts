import { UnitStore } from "./UnitStore";
import { SessionStore } from "./SessionStore";

export class RootStore {
  unitStore: UnitStore
  sessionStore: SessionStore

  constructor(){
    this.unitStore = new UnitStore()
    this.sessionStore = new SessionStore()
  }
}