import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserInfo from "./components/userInfo";
import PrivateRoute from "./PrivateRoute";
import Start from "./components/start";
import Play from "./components/pages/Play";
import Result from "./components/pages/Result";
import Logout from "./layouts/Logout";
import Profile from "./components/Profile";
import PublicRoute from "./PublicRoute";
import FIleupload from "./components/FIleupload";
import Authfirebase from "./components/Authfirebase";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          <PublicRoute exact path="/register" component={Register} />
          {/* <Route
            restricted={true}
            exact
            path="/login"
            component={Login}
          /> */}

          <Route exact path="/login" restricted={true} component={Login} />
          <PublicRoute exact path="/logout" component={Logout} />
          <PublicRoute exact path="/firebase" component={Authfirebase} />
          <PublicRoute exact path="/file" component={FIleupload} />
          <PublicRoute exact path="/profile" component={Profile} />
          <PrivateRoute exact path="/userinfo" component={UserInfo} />
          <PrivateRoute exact path="/" component={Start} />
          <PrivateRoute exact path="/quiz" component={Play} />
          <PrivateRoute exact path="/result" component={Result} />
          {}
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
