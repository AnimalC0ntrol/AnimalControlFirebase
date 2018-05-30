import * as React from "react";
import { EventModel } from "../models/EventModel";
import { Icon } from "semantic-ui-react";
import { observer } from "mobx-react";

interface IProps {
  data: EventModel;
  store?: any;
}

@observer
class Event extends React.Component<IProps> {
  render() {
    const { timestamp, leftPir, centerPir, rightPir } = this.props.data;
    return (
      <div className="event">
        <div className="event-time">{timestamp}</div>
        <table>
          <tr>
            <td>Left PIR</td>
            <td>Center PIR</td>
            <td>Right PIR</td>
          </tr>
          <tr>
            <td>
              <Icon
                name={leftPir ? "remove circle" : "circle"}
                color={leftPir ? "red" : "grey"}
              />
            </td>
            <td>
              <Icon
                name={centerPir ? "remove circle" : "circle"}
                color={centerPir ? "red" : "grey"}
              />
            </td>
            <td>
              <Icon
                name={rightPir ? "remove circle" : "circle"}
                color={rightPir ? "red" : "grey"}
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export { Event };
