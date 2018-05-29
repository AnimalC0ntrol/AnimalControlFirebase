import { observable, action } from "mobx";
import * as firebase from "firebase";

export class SessionStore {
  @observable user?: any;
  @observable error?: string;

  constructor() {
    this.user = undefined;
    this.listenAuthChange();
  }

  @action
  listenAuthChange = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = undefined;
      }
    });
  };

  @action
  setAuthError(error: string) {
    this.error = error;
  }
}
