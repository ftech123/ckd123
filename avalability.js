var firebaseConfig = {
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

// Set database variable
var database = firebase.database()

function saveAvailability() {
    var doctorName = document.getElementById('doctorDropdown').value; // or 'doctorDropdowna' depending on your use case
    var availabilityDay = document.getElementById('availabilityDay').value;
    var availabilityTime = document.getElementById('availabilityTime').value;

    database.ref('availability/' + doctorName).set({
        doctorName: doctorName,
        availabilityDay: availabilityDay,
        availabilityTime: availabilityTime
    }).then(function () {
        displayMessage('Doctor availability saved successfully.');
    }).catch(function (error) {
        console.error('Error saving doctor availability: ', error);
    });
}

function getAvailability() {
    var doctorDropdown = document.getElementById('doctorDropdown');

    // Clear previous options
    doctorDropdown.innerHTML = '<option>Select Doctor</option>';

    database.ref('users').once('value').then(function (snapshot) {
        var users = snapshot.val();
        if (users) {
            // Populate dropdown with doctors whose usernames start with "Dr" or "dr"
            Object.keys(users).forEach(function (userId) {
                var userName = users[userId].username;
                if (userName.trim().toLowerCase().startsWith('dr')) {
                    var option = document.createElement('option');
                    option.value = userName;
                    option.textContent = userName;
                    doctorDropdown.appendChild(option);
                }
            });
            displayMessage('Doctor names loaded successfully.');
        } else {
            displayMessage('No users found.');
        }
    }).catch(function (error) {
        console.error('Error getting user data: ', error);
    });
}

function getAvailabilitya() {
    var doctorDropdown = document.getElementById('doctorDropdowna');

    // Clear previous options
    doctorDropdown.innerHTML = '<option>Select Doctor</option>';

    database.ref('availability').once('value').then(function (snapshot) {
        var availability = snapshot.val();
        if (availability) {
            // Populate dropdown with doctors whose names start with "Dr" or "dr"
            Object.keys(availability).forEach(function (doctorKey) {
                var doctorName = availability[doctorKey].doctorName;
                if (doctorName.trim().toLowerCase().startsWith('dr')) {
                    var option = document.createElement('option');
                    option.value = doctorName;
                    option.textContent = doctorName;
                    doctorDropdown.appendChild(option);
                }
            });
            displayMessage('Doctor names loaded successfully.');

            // Attach event listener to the dropdown
            doctorDropdown.addEventListener('change', function () {
                var selectedDoctor = doctorDropdown.value;
                displayDoctorAvailability(selectedDoctor);
            });
        } else {
            displayMessage('No doctors available.');
        }
    }).catch(function (error) {
        console.error('Error getting doctor availability: ', error);
    });
}

function displayDoctorAvailability(doctorName) {
    // Fetch and display availability details for the selected doctor
    database.ref('availability').orderByChild('doctorName').equalTo(doctorName).once('value').then(function (snapshot) {
        var availability = snapshot.val();
        if (availability) {
            // Display availability details
            var availabilityDetails = Object.values(availability)[0];
            var message = 'Availability Details:\nDay: ' + availabilityDetails.availabilityDay + '\nTime: ' + availabilityDetails.availabilityTime;
            displayMessage(message);
        } else {
            displayMessage('No availability details found for the selected doctor.');
        }
    }).catch(function (error) {
        console.error('Error getting doctor availability details: ', error);
    });
}




function updateAvailability() {
    var doctorName = document.getElementById('doctorName').value;
    var availabilityDay = document.getElementById('availabilityDay').value;
    var availabilityTime = document.getElementById('availabilityTime').value;

    var updates = {
        doctorName: doctorName,
        availabilityDay: availabilityDay,
        availabilityTime: availabilityTime
    };

    database.ref('availability/' + doctorName).update(updates).then(function () {
        displayMessage('Doctor availability updated successfully.');
    }).catch(function (error) {
        console.error('Error updating doctor availability: ', error);
    });
}

function removeAvailability() {
    var doctorName = document.getElementById('doctorName').value;

    database.ref('availability/' + doctorName).remove().then(function () {
        displayMessage('Doctor availability deleted successfully.');
    }).catch(function (error) {
        console.error('Error deleting doctor availability: ', error);
    });
}

function displayMessage(message) {
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.textContent = message;
    }