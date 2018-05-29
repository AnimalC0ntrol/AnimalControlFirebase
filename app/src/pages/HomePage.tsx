import * as React from "react";
import { inject, observer } from "mobx-react";
import { IMoxProps } from "../util/PropsInterface";

@inject("store")
@observer
class HomePage extends React.Component<IMoxProps> {
  public render() {
    return <div>Hello</div>;
  }
}

export { HomePage };
