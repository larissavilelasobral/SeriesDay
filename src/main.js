// Este é o ponto de entrada da sua aplicação

// const { markAsUntransferable } = require("node:worker_threads");

// import { myFunction } from './lib/index.js';

// myFunction();


const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('Confpassword');
const newUser = document.getElementById('nonUser');
const signInButton = document.getElementById('signin-button');

const signUpButton = document.getElementById('signup-button');
const signOutButton = document.getElementById('signout-button');

// login usuarios existentes
signInButton.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line max-len
firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    alert(`Login feito pelo Email: ${email.value}`)
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(`Não há registro de usuário correspondente a este Email`)
  });
});
// criar novo Login de usuários
signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line max-len
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log('deu bom', user);
  })
    .catch((error) => {
      newUser.innerHTML = error.message;
      console.log('deu ruim');
    });
});

// sair da conta do usuario
signOutButton.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut();
  location.reload();
});

// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//        const email = user.email;
//         console.log(`Usuario ativo ${email}`);
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       var uid = user.uid;
//       // ...
//     } else {
//       console.log(`nenhum usuario ativo`);
//       // User is signed out
//       // ...
//     }
// });