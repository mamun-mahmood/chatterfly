import {
  createUserWithEmailAndPassword,
  getAuth,
  // GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  // signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "./firebase.config";
import { useAppSelector } from "../redux/hooks";
import { selectUser, setUser } from "../redux/features/user/userSlice";
import { useEffect, useState } from "react";

const auth = getAuth(app);
const useFirebase = () => {
  const user = useAppSelector(selectUser);
  const [loading, setLoading] = useState(true);
  // const googleProvider = new GoogleAuthProvider();

  const createUser = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // const signInWithGoogle = () => {
  //   return signInWithPopup(auth, googleProvider);
  // };

  const logOut = () => {
    return signOut(auth);
  };

  //why are we doing this?
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as any);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    // signInWithGoogle,
  };
};

export default useFirebase;
