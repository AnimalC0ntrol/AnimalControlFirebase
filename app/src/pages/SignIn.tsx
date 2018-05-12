import * as React from "react";
import * as firebase from "firebase";
import { Form, Button } from "semantic-ui-react";
import { Redirect } from "react-router";
import { inject, observer } from "mobx-react";
import { RootStore } from "../stores/RootStore";

interface IProps {
  store: RootStore
}

@inject("store")
@observer
export class SignIn extends React.Component<IProps> {
  onSubmit = async (event: any) => {
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage)
    }

    

  };

  render() {
    const {store} = this.props
    return (
      <div>
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>E-mail</label>
            <input id="email" placeholder="username" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input id="password" type="password" />
          </Form.Field>
          <Button type="submit">Sign in</Button>
        </Form>

        {!!store.sessionStore.user && <Redirect to="/"/>}
      </div>
    );
  }
}
