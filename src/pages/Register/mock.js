import { saveUserUpdate, saveUser, registerUser } from '../../services/index.js';

export const Register = () => {
  const register = document.createElement('div');
  register.innerHTML = `
  <link rel="stylesheet" href="./pages/Register/style.css" />

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
                <input class="input" id="name" type="name" autocomplete="on" placeholder="🗒  Nome Completo" required>
                <input class="input" id="email" type="email autocomplete="on" placeholder="✉  E-mail" required>
                <p id="email-error" class="error-message font-work"></p>

                <input class="input" id="password" type="password" autocomplete="on" placeholder="⚙  Senha" required>

                <p class="error-message font-work" id="password-length"></p>

                <input class="input" id="password-confirm" type="password" autocomplete="on" placeholder="⚙  Confirmar Senha" required>

                <p class="error-message font-work" id="password-error"></p>
            </form>
            <button id="signup-button-register" class="buttons register-button">Cadastrar-se</button>
            <button id="gobackButton" class="goback-button">
                <img src="./assets/arrow.png" alt="Ícone de Seta"> 
            </button>
        </section>
      </div>
  </main>
  
    `;

  const profileName = register.querySelector('#name');
  const email = register.querySelector('#email');
  const password = register.querySelector('#password');
  const emailError = register.querySelector('#email-error');

  const signUpButtonRegister = register.querySelector('#signup-button-register');

  // INPUTS PARA CADASTRO
  signUpButtonRegister.addEventListener('click', (e) => {
    e.preventDefault();
    registerUser(email.value, password.value)
      .then((userUpdate) => {
        saveUserUpdate(profileName.value);
        saveUser(userUpdate.user, email.value, profileName.value);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          emailError.style.color = 'red';
          emailError.innerHTML = 'E-mail já cadastrado';
        } else if (errorCode === 'auth/invalid-email') {
          emailError.style.color = 'red';
          emailError.innerHTML = 'Insira um e-mail válido';
        }
      });
  });

  return register;
};
