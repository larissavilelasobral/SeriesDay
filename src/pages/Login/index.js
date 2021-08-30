import { googleLogin, signIn } from '../../services/index.js';

export default function Login() {
  const login = document.createElement('div');
  login.innerHTML = `
    <link rel="stylesheet" href="./pages/Login/style.css" />
    
    <main class="box">
        <div class="container">

            <div class="banner">
                <img src="assets/logo.png" alt="Logo">
                <div class="title-container">
                    <h1 class="title">SeriesDay</h1>
                    <h3 class="subtitle">review de séries</h3>
                </div>
            </div>

            <section>
                <form class="form">
                <input class="input" id="email" type="email" autocomplete="on" placeholder="E-mail" required>
                <input class="input" id="password" type="password" autocomplete="on" placeholder="Senha" required>
                <p id="loginError" class="error-message font-work"></p>
                </form>

                <div class="signin">
                <button id="signin-button" class="signin-button buttons">Entrar</button>
                <p> OU </p>
                </div>

            </section>

            <button id="google-button" class="google-button buttons">
                <img class="google-icon-btn" src="../../assets/google-icon.svg" alt="Ícone do Google"/>
                Entrar com Conta Google
            </button>

            <button id="signup-button" class="signup-button buttons"> Não possui cadastro? <span>Clique aqui</span> </button>
        </div>

        <div id="modal-email" class="modal-email-container">
          <div class="modal-email">
            <h3 class="font-work"> Por favor, preencha os campos de login ou cadastre-se. </h3>
            <button id="email-confirmation" class="btn-modal btn-ok"> OK </button>
          </div>
        </div>

    </main>
    
    `;

  const email = login.querySelector('#email');
  const password = login.querySelector('#password');
  const loginError = login.querySelector('#loginError');
  const signInButton = login.querySelector('#signin-button');
  const signUpButton = login.querySelector('#signup-button');

  function startModalEmptyEmail() {
    const modalEmail = login.querySelector('#modal-email');
    if (modalEmail) {
      modalEmail.classList.add('show-modal');

      modalEmail.addEventListener('click', (e) => {
        if (e.target.id === 'modal-email' || e.target.className === 'btn-modal btn-ok') {
          modalEmail.classList.remove('show-modal');
        }
      });
    }
  }

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
    } else {
      startModalEmptyEmail();
    }
  });

  signUpButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = 'register'; 
  });

  const googleButton = login.querySelector('#google-button');

  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    googleLogin();
  });
  return login;
}
