
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBThat61mAP0Mb7w43Lsolt8bw67ppWPnc",
    authDomain: "train-66e6c.firebaseapp.com",
    databaseURL: "https://train-66e6c-default-rtdb.firebaseio.com",
    projectId: "train-66e6c",
    storageBucket: "train-66e6c.appspot.com",
    messagingSenderId: "687158781809",
    appId: "1:687158781809:web:6afe261155c0584bd078d0",
    measurementId: "G-G5GYCFZ4VL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = firebase.auth();

// Logout function
function logout() {
    auth.signOut()
        .then(() => {
            // Sign-out successful.
            displayMessage('User Logged Out!');
            // Redirect to the login page
            window.location.href = 'login.html';
        })
        .catch((error) => {
            // An error happened.
            displayMessage('Error logging out: ' + error.message);
        });
}

// Function to display messages
function displayMessage(message) {
    const messageContainer = document.getElementById('messageContainer');
    messageContainer.textContent = message;
}

