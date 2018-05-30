import * as React from "react";
import { inject, observer } from "mobx-react";
import { RootStore } from "../stores/RootStore";
import { Unit } from "./Unit";

interface IInjected {
  store: RootStore;
}

@inject("store")
@observer
class UnitList extends React.Component {
  get injected() {
    return this.props as IInjected;
  }

  render() {
    const { unitStore } = this.injected.store;
    return (
      <div>
        {unitStore.units.map(unit => <Unit key={unit.unitId} data={unit} />)}
      </div>
    );
  }
}

export { UnitList };
