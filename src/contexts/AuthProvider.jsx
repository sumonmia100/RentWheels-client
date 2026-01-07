import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import app from "../firebase.init";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const facebookLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider).catch((error) => {
      setLoading(false);
      // If Facebook is not configured, throw a more user-friendly error
      if (error.code === "auth/operation-not-allowed") {
        throw new Error(
          "Facebook login is currently unavailable. Please use Google or email login."
        );
      }
      throw error;
    });
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider).catch((error) => {
      setLoading(false);
      // If GitHub is not configured, throw a more user-friendly error
      if (error.code === "auth/operation-not-allowed") {
        throw new Error(
          "GitHub login is currently unavailable. Please use Google or email login."
        );
      }
      throw error;
    });
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    googleLogin,
    facebookLogin,
    githubLogin,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
