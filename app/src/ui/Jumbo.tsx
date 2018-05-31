import * as React from "react";
import { Button } from "semantic-ui-react";

class Jumbo extends React.Component {
  render() {
    return (
      <div id="jumbo">
        <div>
          <p>Protecting drivers by detecting wildlife on roads</p>
          <Button inverted color="yellow">
            Order now
          </Button>
        </div>
      </div>
    );
  }
}

export { Jumbo };
