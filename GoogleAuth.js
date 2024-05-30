import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { writeUserData, readUserData } from './index.js';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
const provider = new GoogleAuthProvider();

document.getElementById('sign-in-btn').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('User signed in: ', user);
      
      // Write user data to the database
      writeUserData(user.uid, user.displayName, user.email, user.photoURL);
      // Read and display user data
      readUserData(user.uid);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error('Error during sign in: ', errorCode, errorMessage);
    });
});

document.getElementById('sign-out-btn').addEventListener('click', () => {
  signOut(auth).then(() => {
    // Sign-out successful.
    console.log('User signed out');
    document.getElementById('user-data').innerHTML = '<p>User signed out</p>';
  }).catch((error) => {
    // An error happened.
    console.error('Error during sign out: ', error);
  });
});