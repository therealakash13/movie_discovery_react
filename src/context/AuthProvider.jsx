import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [firebaseUser, setFirebaseUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);

        const userRef = doc(db, "users", fbUser.uid);
        const snap = await getDoc(userRef);

        if (snap.exists()) {
          setUser(snap.data());
        } else {
          const newUser = {
            uid: fbUser.uid,
            email: fbUser.email,
            username: fbUser.displayName || "User",
            photoURL: fbUser.photoURL || "",
            createdAt: serverTimestamp(),
          };

          await setDoc(userRef, newUser, { merge: true });
          setUser(newUser);
        }
      } else {
        setUser(null);
        setFirebaseUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, username) => {
    console.log(email, password);
    // fix here
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const newUser = {
        uid: res.user.uid,
        email,
        username,
        photoURL: "",
        createdAt: serverTimestamp(),
      };

      await setDoc(doc(db, "users", res.user.uid), newUser, {
        merge: true,
      });

      return res;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = () => signOut(auth);

  const value = {
    user,
    firebaseUser,
    loading,
    signup,
    login,
    googleLogin,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
