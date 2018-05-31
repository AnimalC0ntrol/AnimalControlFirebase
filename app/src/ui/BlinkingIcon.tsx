import * as React from "react";
import { Icon } from "semantic-ui-react";
import { observer } from "mobx-react";
import { observable } from "mobx";

@observer
class BlinkingIcon extends React.Component {
  @observable color: "red" | "black" = "red";
  interval: NodeJS.Timer;

  componentDidMount() {
    this.interval = setInterval(() => {
      this.color = this.color === "red" ? "black" : "red";
    }, 500);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    return (
      <div className="blink-icon">
        <span>Motion detected</span>
        <Icon name={"warning circle"} color={this.color} />
      </div>
    );
  }
}

export { BlinkingIcon };
