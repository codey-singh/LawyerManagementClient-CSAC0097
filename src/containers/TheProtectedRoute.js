import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "../_shared/services/AuthenticationService";

function TheProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        AuthenticationService.isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}

export default TheProtectedRoute;
