import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";

import {toast} from 'react-toastify'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCWvUNo7xZuQqn4RGUCOptsl9PhM5Sk2w8",
  authDomain: "netflix-c225d.firebaseapp.com",
  projectId: "netflix-c225d",
  storageBucket: "netflix-c225d.appspot.com",
  messagingSenderId: "23997316683",
  appId: "1:23997316683:web:334ba486413ae83bf817ce",
  measurementId: "G-PHTXER4VTW"
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
