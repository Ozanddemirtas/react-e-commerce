import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCK1WFD57T-cD5QiTJi-noAkhrs6VihHmM",
  authDomain: "db-crwn-ba568.firebaseapp.com",
  databaseURL: "https://db-crwn-ba568.firebaseio.com",
  projectId: "db-crwn-ba568",
  storageBucket: "db-crwn-ba568.appspot.com",
  messagingSenderId: "435600690282",
  appId: "1:435600690282:web:77c13cb42844608396ce13",
  measurementId: "G-1NC55H0GNE",
};

export const createUserProfileDoc = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
