import React from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRegLogRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.loggedIn);
  let history = useHistory();
  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) {
          return <Component {...props} />;
        } else {
          return history.goBack();
        }
      }}
    />
  );
};

export default ProtectedRegLogRoute;
