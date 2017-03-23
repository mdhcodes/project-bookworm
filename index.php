<?php ?>

<!-- <!DOCTYPE html> -->
<html>

<head>
    <title>EasyAuth</title>
    <meta charset="UTF-8">
</head>
<script src="https://www.gstatic.com/firebasejs/3.6.4/firebase.js"></script>
<script>
// Initialize Firebase
var config = {
    apiKey: "AIzaSyB70Io1kxQlLdCn_qfsJ230sVBK-Z1Xx4c",
    authDomain: "trainschedule-3453c.firebaseapp.com",
    databaseURL: "https://trainschedule-3453c.firebaseio.com",
    storageBucket: "trainschedule-3453c.appspot.com",
    messagingSenderId: "109699411385"
};
firebase.initializeApp(config);
</script>
<!-- Initializes the sign-in widget from firebase web -->
<script src="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.js"></script>
<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/1.0.0/firebaseui.css" />
<script type="text/javascript">
var uiConfig = {
    signInSuccessUrl: 'loggedIn.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
</script>
<div></div>

<body>
    <div id="firebaseui-auth-container"></div>
</body>

</html>
