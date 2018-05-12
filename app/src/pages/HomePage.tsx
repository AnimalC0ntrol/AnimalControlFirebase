import * as React from "react";
import { inject, observer } from "mobx-react";
import { IMoxProps } from "../util/PropsInterface";

@inject("store")
@observer
class HomePage extends React.Component<IMoxProps> {

  componentDidMount() {
    const { getUnits } = this.props.store.unitStore
    getUnits()
  }

  public render() {
    const { units } = this.props.store.unitStore
    console.log(units)

    return <div>Hello</div>;
  }
}

export { HomePage };
