import * as React from "react";
import { Icon, Button } from "semantic-ui-react";
import { UnitModel } from "../models/UnitModel";
import { observer, inject } from "mobx-react";
import { RootStore } from "../stores/RootStore";
import { BlinkingIcon } from "./BlinkingIcon";

interface IProps {
  data: UnitModel;
  store?: any;
}

interface IInjected {
  store: RootStore;
}

@inject("store")
@observer
class Unit extends React.Component<IProps> {
  get injected() {
    return this.props as IInjected;
  }

  render() {
    const {
      readableId,
      lastUpdate,
      isInAlertState,
      position
    } = this.props.data;
    return (
      <div className={"unit-idle"}>
        <div className="unit-id">
          <span>{readableId}</span>
          {isInAlertState && <BlinkingIcon />}
          {!isInAlertState && <Icon name={"check circle"} color={"green"} />}
        </div>
        <div className="unit-data">
          <table>
            <tr>
              <td>Last event</td>
              <td>{lastUpdate}</td>
            </tr>
            <tr>
              <td>Position</td>
              <td>
                {position.lat}, {position.lng}
              </td>
            </tr>
          </table>
        </div>
        <div className="unit-actions">
          <Button
            icon
            color="teal"
            onClick={this.getEvents}
            labelPosition="right"
          >
            Show events
            <Icon name="list" />
          </Button>
        </div>
      </div>
    );
  }

  private getEvents = () => {
    const { unitId } = this.props.data;
    const { eventStore } = this.injected.store;
    eventStore.listenToEvents(unitId);
  };
}

export { Unit };
