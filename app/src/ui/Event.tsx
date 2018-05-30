import * as React from "react";
import { EventModel } from "../models/EventModel";
import { Icon } from "semantic-ui-react";

interface IProps {
  data: EventModel;
  store?: any;
}

class Event extends React.Component<IProps> {
  render() {
    const { timestamp, leftPir, centerPir, rightPir } = this.props.data;
    return (
      <div className="event">
        <div>
          <Icon
            name={leftPir ? "remove circle" : "circle"}
            color={leftPir ? "red" : "grey"}
          />
          <Icon
            name={centerPir ? "remove circle" : "circle"}
            color={centerPir ? "red" : "grey"}
          />
          <Icon
            name={rightPir ? "remove circle" : "circle"}
            color={rightPir ? "red" : "grey"}
          />
        </div>
        <span className="event-time">{timestamp}</span>
      </div>
    );
  }
}

export { Event };
