// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBMOPx6jE3wXjEBNo9LvUGpmbS4rtexDHY",
    authDomain: "socialnetworklab-48687.firebaseapp.com",
    projectId: "socialnetworklab-48687",
    storageBucket: "socialnetworklab-48687.appspot.com",
    messagingSenderId: "566417511888",
    appId: "1:566417511888:web:3b978aa839a1b85d7615d5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);



  const auth = firebase.auth();

  function singUp() {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    const promise = auth.cre
  }