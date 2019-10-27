import React from "react"
import { connect } from "react-redux";
import {Route, Redirect} from "react-router"

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>{
        return !localStorage.getItem('tokenQRest') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }}
    />
  );

const mapStateToProps = (state) => ({ user: state.users.user})

export default connect(mapStateToProps)(PublicRoute)