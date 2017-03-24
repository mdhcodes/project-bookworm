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
    signInSuccessUrl: 'page2.html',
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
ui.start('#signIn', uiConfig);


var database = firebase.database();
console.log(database);

