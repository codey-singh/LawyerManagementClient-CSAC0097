import React from "react";
import { Route, Redirect } from "react-router-dom";

const fakeAuth = {
  isAuthenticated: true,
};

function TheProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
}

export default TheProtectedRoute;
