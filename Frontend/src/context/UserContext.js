import React from "react";
import axios from 'axios';
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "LOGIN_FAILURE": // Add this case to handle LOGIN_FAILURE
      return { ...state,err:true, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state,isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut ,Profile};

// ###########################################################
function loginUser(dispatch, login, password, history, setIsLoading, setError,err) {
  setError(false); // Reset error state before making the request
  setIsLoading(true);
  console.log(err);
  if (!!login && !!password) {
    axios
      .post('http://127.0.0.1:8000/api/login', {
        email: login, // Update to match your form field names
        password: password, // Update to match your form field names
      })
      .then(response => {
        // Handle the successful response from the backend
        console.log(response);
       
        setError(false); // Reset error state on success
        setIsLoading(false);
        dispatch({ type: 'LOGIN_SUCCESS' });
        history.push('/app/dashboard');
      })
      .catch(error => {
        // Handle authentication failure
        console.log(err);
        err = true;
        console.log(err);

        setIsLoading(false);
        dispatch({ type: 'LOGIN_FAILURE' });
      
      });
  } else {
    dispatch({ type: 'LOGIN_FAILURE' });
    setError(true); // Set error state to true when login and password are missing
    setIsLoading(false);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

function Profile(dispatch,login,role)
{
  client.get("/api/user")
  .then(function(res) {
    console.log(res);    })
  .catch(function(error) {
  
  });
}
