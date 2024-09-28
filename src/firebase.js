import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";

import {toast} from 'react-toastify'

const firebaseConfig = {
  apiKey: "AIzaSyAuUJ_xtzmHWWTfCefTwCMBSyahjD5mVgU",
  authDomain: "netflix-21c78.firebaseapp.com",
  projectId: "netflix-21c78",
  storageBucket: "netflix-21c78.appspot.com",
  messagingSenderId: "529459592517",
  appId: "1:529459592517:web:6cbe088493f36ae32dd22c",
  measurementId: "G-P88LCCX907",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);

export const signup = async (name, email, password) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);

    const user = response.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
    });
    // alert('User succesfully added');
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
 }
};

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // alert('User successfully loged ');
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "))
  }
};
