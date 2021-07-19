const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const newUser = document.getElementById('nonUser');
const signInButton = document.getElementById('signin-button');

const signInGoogleButton = document.getElementById('signingoogle-button');

// const signUpButton = document.getElementById('signup-button');
const paginas = document.getElementById('root');
const init = () => {
  window.addEventListener('hashchange', () => {
    paginas.innerHTML = '';
    switch (window.location.hash) {
      case ' ':
        paginas.appendChild(home());
        break;
      case '#about':
        paginas.appendChild(about());
        break;
      case '#contects':
        paginas.appendChild(contact());
        break;
      default:
        paginas.appendChild(home());
    }
  });
};


// Login de novos usuários(criar usuario)
signInButton.addEventListener('click', (e) => {
  e.preventDefault();
  // eslint-disable-next-line max-len
  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).then((userCredential) => {
    // Signed in
    if (password.value === confirmPassword.value) {
        const user = userCredential.user;
      console.log('deu bom', user);
        window.addEventListener('load', () =>{
            init.innerHTML =
        })
      
      
    } else {
      console.log('senhas não coincidem');
    }
  })
    .catch((error) => {
      newUser.innerHTML = error.message;
      console.log('deu ruim');
    });
});
const signInGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  console.log('login com o google');
  return firebase.auth().signInWithPopup(provider);
};

signInGoogleButton.addEventListener('click', (e) => {
  e.preventDefault();
  signInGoogle()
    .catch((error) => {
      // eslint-disable-next-line no-alert
      alert(error.message);
    });
});
