import * as React from "react";
import * as firebase from "firebase";
import { Form, Button, Container, Message } from "semantic-ui-react";
import { Redirect } from "react-router";
import { inject, observer } from "mobx-react";
import { RootStore } from "../stores/RootStore";

interface IProps {
  store: RootStore;
}

@inject("store")
@observer
export class SignIn extends React.Component<IProps> {
  onSubmit = async (event: any) => {
    const { sessionStore } = this.props.store;
    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      sessionStore.setAuthError(errorMessage);
    }
  };

  render() {
    const { sessionStore } = this.props.store;
    const isSignedIn = !!sessionStore.user;
    return (
      <Container>
        <Form onSubmit={this.onSubmit} error>
          <Form.Field>
            <label>E-mail</label>
            <input id="email" placeholder="Username" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input id="password" placeholder="Password" type="password" />
          </Form.Field>
          <Button type="submit">Sign in</Button>
          {!!sessionStore.error && (
            <Message error header="Error" content={sessionStore.error} />
          )}
        </Form>

        {isSignedIn && <Redirect to="/" />}
      </Container>
    );
  }
}
