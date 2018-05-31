import * as React from "react";
import { inject, observer } from "mobx-react";
import { RootStore } from "../stores/RootStore";
import { Button } from "semantic-ui-react";
import { PirLocation } from "../stores/FakeStore";

interface IProps {
  store: RootStore;
}

@inject("store")
@observer
class Simulator extends React.Component<IProps> {
  fakeCenter = () => {
    const { fakeStore } = this.props.store;
    fakeStore.fakeAlert(PirLocation.CENTER);
  };

  fakeLeft = () => {
    const { fakeStore } = this.props.store;
    fakeStore.fakeAlert(PirLocation.LEFT);
  };

  fakeRight = () => {
    const { fakeStore } = this.props.store;
    fakeStore.fakeAlert(PirLocation.RIGHT);
  };

  public render() {
    const { fakeStore } = this.props.store;
    return (
      <div>
        <Button onClick={fakeStore.fakeFirstBoot}>Device Init</Button>
        <Button onClick={this.fakeCenter}>Fake Alert | Center</Button>
        <Button onClick={this.fakeLeft}>Fake Alert | Left</Button>
        <Button onClick={this.fakeRight}>Fake Alert | Right</Button>
        <Button onClick={fakeStore.removeFakeUnit}>
          Remove simulated data
        </Button>
      </div>
    );
  }
}

export { Simulator };
