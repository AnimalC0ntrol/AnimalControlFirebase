import * as React from "react";
import { inject, observer } from "mobx-react";
import { RootStore } from "../stores/RootStore";
import { Button } from "semantic-ui-react";
import { Event } from "./Event";

interface IInjected {
  store: RootStore;
}

@inject("store")
@observer
class EventList extends React.Component {
  get injected() {
    return this.props as IInjected;
  }

  render() {
    const { eventStore } = this.injected.store;
    return (
      <div>
        <Button color={"teal"} onClick={eventStore.clearEvents}>
          Back
        </Button>
        {eventStore.events.map(event => (
          <Event key={event.uuid} data={event} />
        ))}
      </div>
    );
  }
}

export { EventList };
