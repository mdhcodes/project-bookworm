 // Initialize Firebase
var config = {
    apiKey: "AIzaSyD5lEQ5fW4ZDXKABQoETRhFcBZhCjgta7E",
    authDomain: "auth-test-567d1.firebaseapp.com",
    databaseURL: "https://auth-test-567d1.firebaseio.com",
    storageBucket: "auth-test-567d1.appspot.com",
    messagingSenderId: "991246447701"
};    
firebase.initializeApp(config);

var uiConfig = {
    signInSuccessUrl: 'index.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};
// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

var database = firebase.database();
console.log(database);

// Track sign-in status
initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var uid = user.uid;
            var providerData = user.providerData;
            user.getToken().then(function(accessToken) {
                var details = {
                    displayName: displayName,
                    email: email,
                    emailVerified: emailVerified,
                    photoURL: photoURL,
                    uid: uid,
                    accessToken: accessToken,
                    providerData: providerData
                };
                console.log(details.displayName);
                $('#sign-in-status').html('Signed in');
                $('#sign-in').hide();
                $('#sign-out').show();

                document.getElementById('accountModal').textContent = JSON.stringify(details, null, 'null');
            });
        } else {
            // User is signed out.
            $('#sign-in-status').html('Signed out');
            $('#sign-in').show();
            $('#sign-out').hide();
            $('#account-details').hide();
        }
    }, function(error) {
      console.log(error);
    });
};

window.addEventListener('load', function() {
    initApp();
});

