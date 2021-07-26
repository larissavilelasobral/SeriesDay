import home from './pages/home/main.js';
import timeline from './pages/timeline/main.js';
import cadastro from './pages/cadastro/main.js';

import { configureLogin, removeLogin } from './lib/index.js';

// usar aspas simples
// colocar ponto e virgula no final
// indenta com 2 espaços

const container = document.querySelector('#root');

// SINGLE PAGE APLICATION
const init = () => {
  window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
      case ' ':
        container.appendChild(home());
        break;
      case '#cadastro':
        container.appendChild(cadastro());
        break;
      case '#timeline':
        container.appendChild(timeline());
        break;
      default:
        container.appendChild(home());
    }
  });
};

// FUNÇÃO PARA ABRIR O SITE SEMPRE NO HOME E VERIFICAR SE TEVE MUDANÇA NA #
window.addEventListener('load', () => {
  container.appendChild(home());
  init();

  // VARIAVEIS
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const newUser = document.getElementById('nonUser');
  const signInButton = document.getElementById('signin-button');
  const signUpButton = document.getElementById('signup-button');

  // LOGIN DE USUARIOS EXISTENTES POR EMAIL E SENHA
  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
      .then((userCredential) => {
      // Signed in
        const user = userCredential.user;
        console.log(`descobrir oq é ${user}`);
        window.location.hash = 'timeline'; // ir para o feed
        container.innerHTML = ' ';
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        newUser.innerHTML = ('Não há registro de usuário correspondente a este Email');
        console.log(`descobrir oq é ${errorCode} e ${errorMessage}`);
      });
  });

  // BOTÃO PARA MUDAR PARA A PAGINA DE CADASTRO APÓS O CARREGAMENTO DA PAGINA
  const pageSignUp = document.getElementById('page-signup-button');
  pageSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'cadastro'; // ir para pagina cadastro
    container.innerHTML = ' ';
  });
  // BOTÃO SAIR DA CONTA USUARIO
  const signOutButton = document.getElementById('signout-button');
  signOutButton.addEventListener('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
    window.location.reload();
    console.log('saiu da conta');
  });

  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    // eslint-disable-next-line max-len
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log('deu bom', user);
      window.location.hash = 'timeline'; // ir para o feed
      container.innerHTML = ' ';
    })
      .catch((error) => {
        newUser.innerHTML = error.message;
        console.log('deu ruim');
      });
  });
});

// Iniciando o firebase
document.addEventListener('DOMContentLoaded', () => {
  try {
    firebase.app();
    configureLogin();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        removeLogin();
      }
    });
  } catch (e) {
    console.error(e);
    console.log('Error loading the Firebase SDK, check the console.');
  }
});

// CRIAR NOVO USUARIO POR EMAIL E SENHA ver se funciona sem load


