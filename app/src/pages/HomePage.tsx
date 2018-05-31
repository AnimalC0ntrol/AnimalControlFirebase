import * as React from "react";
import { inject, observer } from "mobx-react";
import { IMoxProps } from "../util/PropsInterface";
import { Jumbo } from "../ui/Jumbo";
import { Container, Card, Image, Grid } from "semantic-ui-react";

@inject("store")
@observer
class HomePage extends React.Component<IMoxProps> {
  public render() {
    return (
      <div id="homepage">
        <Jumbo />
        <Container>
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column>
                <Card>
                  <Image src="http://www.kinyu-z.net/data/wallpapers/134/1173771.jpg" />
                  <Card.Content>
                    <Card.Header>What we do</Card.Header>
                    <Card.Description>
                      Every year many cars collide with moose, reindeer, sheep
                      and other animals. Using our device will decrease the risk
                      of collisions with wildlife.
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card>
                  <Image src="https://vignette.wikia.nocookie.net/central/images/8/85/20161028-technology-top-image.jpg/revision/latest?cb=20170621111104" />
                  <Card.Content>
                    <Card.Header>Technology</Card.Header>
                    <Card.Description>
                      <p>
                        <strong>PIR</strong> to detect animal movement.
                      </p>
                      <p>
                        <strong>UV</strong> to avoid false alerts.
                      </p>
                      <p>
                        <strong>GPS</strong> so you can see where your device is
                        deployed.
                      </p>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
                <Card>
                  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREdZOENuFsN9qniQE53lDpfmwmDDtDtnmqqou3DhWVLtYbx2wn" />
                  <Card.Content>
                    <Card.Header>Contact us</Card.Header>
                    <Card.Description>
                      <p>Contact us for a demo of the device.</p>
                      <p>contact@animalcontrol.com</p>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export { HomePage };
