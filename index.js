// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, set, get, onValue, update, remove, push, child } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBptPdrVt4eBLOVMq48Sfd9JWCwMF08_VE",
  authDomain: "fir-essentials-6820f.firebaseapp.com",
  databaseURL: "https://fir-essentials-6820f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-essentials-6820f",
  storageBucket: "fir-essentials-6820f.appspot.com",
  messagingSenderId: "343853023905",
  appId: "1:343853023905:web:be1267b720032d7cdee6e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to write data to the database
export function writeUserData(userId, name, email, imageUrl) {
    set(ref(db, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl
    }).then(() => {
      console.log('User data written to database');
    }).catch((error) => {
      console.error('Error writing user data: ', error);
    });
  }
  
  // Function to read data from the database and display it in the HTML
  export function readUserData(userId) {
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log('User data fetched: ', data);
      displayUserData(data);
    }, (error) => {
      console.error('Error fetching user data: ', error);
    });
  }
  
  // Function to display user data in the HTML
  function displayUserData(data) {
    const userDataDiv = document.getElementById('user-data');
    if (data) {
      userDataDiv.innerHTML = `
        <h2>User Information</h2>
        <p><strong>Name:</strong> ${data.username}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Profile Picture:</strong> <img src="${data.profile_picture}" alt="Profile Picture" style="width: 100px; height: 100px;"></p>
      `;
    } else {
      userDataDiv.innerHTML = '<p>No data available</p>';
    }
  }
  
  // Example usage (commented out to avoid automatic execution)
  // readUserData('user1');