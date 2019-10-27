import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Dashboard } from "./pages";
// import PrivateRoute from "./components/PrivateRoute";
//non AMD
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import ForgetPassword from './pages/ForgetPassword';
// import ResetPassword from './pages/ResetPassword';
// import PrivateRoute from "./components/PrivateRoute";
// import PublicRoute from "./components/PublicRoute";

const uri = process.env.PUBLIC_URL;

class App extends Component {
  render() {    
    return (
      <Router>
        <Switch>
          {/* <PublicRoute path={`${uri}/login`} component={SignIn} /> */}
          {/* <PublicRoute path={`${uri}/signup`} component={SignUp} /> */}
          {/* <PublicRoute path={`${uri}/forgetPassword`} component={ForgetPassword} /> */}
          {/* <PublicRoute path={`${uri}/resetPassword`} component={ResetPassword} /> */}
          {/* <Route path={`${uri}/`} component={Dashboard} /> */}
          <Route path={`${uri}/`} component={Dashboard} />
        </Switch>
      </Router>
    ) 
  }
}

export default App;
