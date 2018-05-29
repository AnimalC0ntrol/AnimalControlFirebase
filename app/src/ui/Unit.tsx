import * as React from "react";
import { Card, Icon } from "semantic-ui-react";
import { UnitModel } from "../models/UnitModel";

interface IProps {
  data: UnitModel;
}

class Unit extends React.Component<IProps> {
  render() {
    const { unitId, lastUpdate } = this.props.data;
    return (
      <Card>
        <Card.Content header={`ID: ${unitId}`} />
        <Card.Content description={lastUpdate} />
        <Card.Content extra>
          <Icon name="user" />
          Idle
        </Card.Content>
      </Card>
    );
  }
}

export { Unit };
