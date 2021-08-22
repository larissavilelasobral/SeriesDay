import { googleLogin, signIn } from '../../services/index.js';

export const Login = () => {
  const login = document.createElement('div');
  login.innerHTML = `
    <input class="input" id="email" type="email" autocomplete="on" placeholder="E-mail" required>
    <input class="input" id="password" type="password" autocomplete="on" placeholder="Senha" required>
    <button id="signin-button" class="signin-button buttons">Entrar</button>

    <button id="google-button" class="google-button buttons">
        <img class="google-icon-btn" src="../../assets/google-icon.svg" alt="Ícone do Google"/>
            Entrar com Conta Google
    </button>
    `;

  // VARIAVEIS
  const email = login.querySelector('#email');
  const password = login.querySelector('#password');
  const loginError = login.querySelector('#loginError');
  const signInButton = login.querySelector('#signin-button');

  // LOGIN DE USUARIOS EXISTENTES POR EMAIL E SENHA
  signInButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (email.value) {
      signIn(email.value, password.value)
        .then(() => {
          window.location.hash = 'timeline'; // ir para o feed
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === 'auth/invalid-email') {
            loginError.style.color = 'red"';
            loginError.innerHTML = 'Não há registro de usuário correspondente a este e-mail';
          } else if (errorCode === 'auth/wrong-password') {
            loginError.style.color = 'red';
            loginError.innerHTML = 'Senha inválida';
          }
        });
    }
  });

  //  AUTENTICAÇÃO COM CONTA GOOGLE
  const googleButton = login.querySelector('#google-button');

  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    googleLogin();
  });

  return login;
};
