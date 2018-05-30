import { observable, action } from "mobx";
import { EventModel } from "../models/EventModel";
import { UnitService } from "./services/UnitService";

export class EventStore {
  eventListener: any;
  @observable events: EventModel[] = [];
  @observable isLoadingEvents: boolean;

  @action
  listenToEvents = async (unitId: string) => {
    this.startLoading();
    this.eventListener = UnitService.getEventListener(unitId, this.saveEvents);
  };

  @action
  clearEvents = () => {
    if (this.eventListener) {
      this.eventListener();
    }
    this.events = [];
    this.stopLoading();
  };

  @action
  saveEvents = (events: EventModel[]) => {
    const sortedEvents = events.sort(
      (a, b) => b.timestampSeconds - a.timestampSeconds
    );
    this.events = sortedEvents;
    this.stopLoading();
  };

  @action
  private startLoading = () => {
    this.isLoadingEvents = true;
  };

  @action
  private stopLoading = () => {
    this.isLoadingEvents = false;
  };
}
