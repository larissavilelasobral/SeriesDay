// Este é o ponto de entrada da sua aplicação
// import { myFunction } from './lib/index.js';
// myFunction();

// configuração da pagina firebase

const firebaseConfig = {
  apiKey: 'AIzaSyBMOPx6jE3wXjEBNo9LvUGpmbS4rtexDHY',
  authDomain: 'socialnetworklab-48687.firebaseapp.com',
  projectId: 'socialnetworklab-48687',
  storageBucket: 'socialnetworklab-48687.appspot.com',
  messagingSenderId: '566417511888',
  appId: '1:566417511888:web:3b978aa839a1b85d7615d5',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function singUp() {
  const email = document.getElementById('email');
  const password = document.getElementById('password');

  const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
  promise.catch((e) => alert(e.message));

  alert('logado');
}

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
      const user = userCredential.user;
      alert(`Login feito pelo Email: ${email.value}. Info: ${user}`);
    // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Não há registro de usuário correspondente a este Email. info: ${errorCode} || ${errorMessage}`);
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
  auth.signOut();
  alert('sair da conta');
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
