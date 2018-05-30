import * as React from "react";
import { Card, Icon, Button } from "semantic-ui-react";
import { UnitModel } from "../models/UnitModel";
import { observer, inject } from "mobx-react";
import { RootStore } from "../stores/RootStore";

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
    const { readableId, lastUpdate } = this.props.data;
    return (
      <Card>
        <Card.Content header={`ID: ${readableId}`} />
        <Card.Content description={lastUpdate} />
        <Button color="teal" onClick={this.getEvents}>
          Show events
        </Button>
        <Card.Content extra>
          <Icon name="user" />
          Idle
        </Card.Content>
      </Card>
    );
  }

  private getEvents = () => {
    const { unitId } = this.props.data;
    const { eventStore } = this.injected.store;
    eventStore.listenToEvents(unitId);
  };
}

export { Unit };
