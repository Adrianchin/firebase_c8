import React, { useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { FirebaseContext } from "./FirebaseProvider";

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const children = props.children;
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState();

  const fbContext = useContext(FirebaseContext);
  const auth = fbContext.auth;

  const login = async (email, password) => {
    try {
      let userCred = await signInWithEmailAndPassword(auth, email, password);
      if (userCred) {
        console.log("Logged in!!", userCred.user);
        setAuthError(null)
      } else {
        console.log("Login failed!");
        setAuthError("Login Failed")
      }
    } catch (ex) {
      console.log("AUTH FAILURE!", ex.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {//Auto log in to firebase when you exit the app but do not log out
      console.log("onAuthStateChanged() - new User!!", user);
      setUser(user);
    });
    return unsub; // to shut down onAuthStateChanged listener
  }, [auth]);

  const theValues = { user , authError, login, logout}; //gives login and logout function to all children
  return (
    <AuthContext.Provider value={theValues}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
