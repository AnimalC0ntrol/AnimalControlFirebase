import * as React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import * as firebase from "firebase";
import "@firebase/firestore";
import { Provider, observer } from "mobx-react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Devices } from "./pages/Devices";
import { Page404 } from "./pages/Page404";
import { RootStore } from "./stores/RootStore";
import { CreateUser } from "./pages/CreateUser";
import { Footer } from "./ui/Footer";
import { SignIn } from "./pages/SignIn";
import { Button } from "semantic-ui-react";
import { Simulator } from "./pages/Simulator";

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

    return (
      <Provider store={this.rootStore}>
        <Router>
          <div id="page">
            <header>
              <h1>
                <Link to="/">
                  <img src="logo.png" />
                </Link>
              </h1>
              <nav>
                <ul>
                  {sessionStore.user && (
                    <li>
                      <Link to="/devices">
                        <Button inverted color="yellow">
                          Your devices
                        </Button>
                      </Link>
                    </li>
                  )}
                  {!sessionStore.user && (
                    <li>
                      <Button inverted color="yellow">
                        <Link to="/createuser">Sign up</Link>
                      </Button>
                    </li>
                  )}
                  {!sessionStore.user && (
                    <li>
                      <Button inverted color="yellow">
                        <Link to="/signin">Sign inn</Link>
                      </Button>
                    </li>
                  )}
                  {sessionStore.user && (
                    <li>
                      <Button inverted color="yellow">
                        {sessionStore.user.email}
                      </Button>
                    </li>
                  )}
                </ul>
              </nav>
            </header>

            <main>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/devices" component={Devices} />
                <Route path="/createuser" component={CreateUser} />
                <Route path="/signin" component={SignIn} />
                <Route path="/simulator" component={Simulator} />
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
