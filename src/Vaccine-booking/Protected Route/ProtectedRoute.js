import React from "react";
import { Route, Redirect,useHistory} from "react-router-dom";
import auth from './auth'
// const isAuthenticated = window.localStorage.getItem("token");
// const history=useHistory();
const ProtectedRoute = ({ component:Component, ...rest }) => {
  
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
         return <Component  {...props} />;
        } else {
          return <Redirect
          to={{
            pathname: "/indiadetails",
            state: {
              from: props.location
            }
          }}
        /> 
         
        }
      }}
    />
  );
};

export default ProtectedRoute;
