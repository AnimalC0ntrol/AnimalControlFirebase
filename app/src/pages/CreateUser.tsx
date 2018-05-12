import * as React from "react";
import * as firebase from "firebase";
import { Form, Button } from "semantic-ui-react";
import { Redirect } from "react-router";
import { RootStore } from "../stores/RootStore";
import { inject, observer } from "mobx-react";

interface IProps {
  store: RootStore
}

@inject("store")
@observer
export class CreateUser extends React.Component<IProps> {

  onSubmit = async (event: any) => {
    const email = event.target.email.value
    const password = event.target.password.value

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage)
    }
  };

  render() {
    const { sessionStore } = this.props.store
    return (
      <div>
        <h1>Create a user</h1>
        {!!sessionStore.user && <Redirect to="/"/>}
        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>E-mail</label>
            <input id="email" placeholder="username" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input id="password" type="password" />
          </Form.Field>
          <Button type="submit">Create user!</Button>
        </Form>

        
      </div>
    );
  }
}
