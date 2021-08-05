// Configurando as autenticações
export const googleLogin = (provider) => {
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      firebase.firestore().collection('users').doc(user.email)
        .set({
          name: user.displayName,
          id: user.uid,
          photo: user.photoURL,
        }, { merge: true });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('Essa conta já existe com uma credencial diferente');
      }
    });
};

export const signOut = () => {
  firebase.auth().signOut();
  window.location.hash = '';
  location.reload();
}

export const loginWithEmail = (email, password, profileName) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((result) => {
      const user = result.user;
      const userUp = firebase.auth().currentUser;
      userUp.updateProfile({
        displayName: profileName,
        photoURL: 'urlImg',
      });
      firebase.firestore().collection('users').doc(user.email)
        .set({
          name: profileName,
          id: user.uid,
          photo: user.photoURL,
        });
      console.log(user);
    });
};

// LOGIN DE USUARIOS EXISTENTES POR EMAIL E SENHA
export const signInWithEmailPassword = (email, password, newUser) => {
  console.log('dddsds')
  firebase.auth().signInWithEmailAndPassword(email.value, password.value, newUser)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(`descobrir oq é ${user}`);
      window.location.hash = 'timeline'; // ir para o feed
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      newUser.innerHTML = ('Não há registro de usuário correspondente a este Email');
      console.log(`descobrir oq é ${errorCode} e ${errorMessage}`);
    });
};
