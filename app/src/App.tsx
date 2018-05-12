import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import * as firebase from "firebase";
import "@firebase/firestore";
import { Provider, observer } from "mobx-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { Page404 } from "./pages/Page404";
import { RootStore } from "./stores/RootStore";
import { CreateUser } from "./pages/CreateUser";
import { Menu, Container } from "semantic-ui-react";
import { Footer } from "./ui/Footer";
import { SignIn } from "./pages/SignIn";

@observer
class App extends React.Component {
  rootStore: RootStore;

  constructor(props: any) {
    super(props);
    this.firebaseSetup();
    this.rootStore = new RootStore();
  }

  firebaseSetup = () => {
    try {
      const config = {
        apiKey: "AIzaSyB55JFfd3cnNYTYwLaB6H6SsVsy7K9Qe00",
        authDomain: "animalcontrol-58410.firebaseapp.com",
        projectId: "animalcontrol-58410"
      };
      const firestore = firebase.firestore();
      const settings = { timestampsInSnapshots: true };
      firestore.settings(settings);
      firebase.initializeApp(config);
    } catch (err) {
      // we skip the "already exists" message which is
      // not an actual error when we're hot-reloading
      if (!/already exists/.test(err.message)) {
        console.error("Firebase initialization error", err.stack);
      }
    }
  };

  public render() {
    const { sessionStore } = this.rootStore;

    console.log(sessionStore.user)

    return (
      <Provider store={this.rootStore}>
        <Router>
          <div id="page">
            <header>
              <Menu inverted>
                <Container>
                  <Menu.Item as="a" header>
                    <Link to="/">AnimalControl</Link>
                  </Menu.Item>

                  <Menu.Item as="a" header>
                    <Link to="/devices">Your devices</Link>
                  </Menu.Item>

                  {!sessionStore.user && (
                    <Menu.Item as="a" header>
                      <Link to="/createuser">Sign up</Link>
                    </Menu.Item>
                  )}

                  {!sessionStore.user && (
                    <Menu.Item as="a" header>
                      <Link to="/signin">Sign inn</Link>
                    </Menu.Item>
                  )}

                  {sessionStore.user && (
                    <Menu.Item as="a" header>
                      {sessionStore.user.email}
                    </Menu.Item>
                  )}
                </Container>
              </Menu>
            </header>

            <main>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/map" component={MapPage} />
                <Route path="/createuser" component={CreateUser} />
                <Route path="/signin" component={SignIn} />
                <Route component={Page404} />
              </Switch>
            </main>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
