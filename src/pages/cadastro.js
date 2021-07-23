export default () => {
  // eslint-disable-next-line no-multi-assign
  const conteinerLogin = document.getElementById('boxid').innerHTML = `
    <div class="banner-register">
        <img src="assets/logo.png" alt="Logo">
        <div class="title-container">
            <h1 class="title">SeriesDay</h1>
            <h3 class="subtitle">review de séries</h3>
        </div>
    </div>
    <section>
        <form class="formRegister">
            <input class="input" id="name" type="name" autocomplete="on" placeholder="Nome Completo" required>
            <input class="input" id="email" type="email" autocomplete="on" placeholder="E-mail" required>
            <input class="input" id="password" type="password" autocomplete="on" placeholder="Senha" required>
            <input class="input" id="password-Confirm" type="password-Confirm" autocomplete="on" placeholder="Confirmar Senha" required>
            <p id= "nonUser"></p>
        </form>
        <div>
            <button id="signup-button-register" class="login-buttons-register">Cadastrar-se</button>
        </div>
        <input id="setaButton" type="image" class="seta" src="./assets/seta.png" />
    </section>
`;
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const passwordConfirm = document.getElementById('password-Confirm');
  const newUser = document.getElementById('nonUser');

document.getElementById('signup-button-register').addEventListener('click', (e) => {
    e.preventDefault();
    console.log('funcionou');
    // criar novo Login de usuários
    // eslint-disable-next-line max-len
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
      // Signed in
      if(password === passwordConfirm) {
        const user = userCredential.user;
        console.log('senhas corretas', name + user);
      }
    })
      .catch((error) => {
        newUser.innerHTML = error.message;
        console.log('deu ruim');
      });
  });

// document.getElementById('setaButton').addEventListener('click', (e) => {
//     e.preventDefault();
//     console.log('funcionou button img');
//     window.history.back();
// });
  return conteinerLogin;
};

