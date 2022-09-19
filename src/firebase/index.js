import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
} from 'firebase/auth';
import { getUserInfo } from './title';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const store = getFirestore(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export const redirectLogin = async () => {
  try {
    window.localStorage.setItem('gas_redirect', true);
    await signInWithRedirect(auth, provider);
  } catch (error) {
    alert(error);
    console.log(error);
  }
};

export const redirectResult = () => {
  getRedirectResult(auth)
    .then((result) => {
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      const user = result.user;
      window.localStorage.setItem('gas_id', user.uid);

      return { id: user.uid, email: user.email };
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
};

export const popupLogin = () =>
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      window.localStorage.setItem('gas_id', user.uid);

      return { id: user.uid, email: user.email };
    })
    .catch((error) => {
      alert(error);
    });
