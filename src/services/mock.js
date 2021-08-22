// Configurando as autenticações
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
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
        // eslint-disable-next-line no-alert
        alert('Essa conta já existe com uma credencial diferente');
      }
    });
}
googleLogin();

function signOut() {
  firebase.auth().signOut();
  window.location.hash = '';
  window.location.reload();
}
signOut();

function saveUserUpdate(name) {
  firebase.auth().currentUser.updateProfile({
    displayName: name,
  })
    .then(() => true)
    .catch((error) => error);
}
saveUserUpdate();

function saveUser(user, userEmail, userName) {
  firebase.firestore().collection('users').doc(userEmail).set({
    id: user.uid,
    name: userName,
    email: userEmail,
    photo: '',
  })
    .then(() => true)
    .catch((error) => error);
}
saveUser();

function registerUser(email, password) {
  firebase.auth().createUserWithEmailAndPassword(email, password);
}
registerUser();

function signIn(email, password) {
  firebase.auth().signInWithEmailAndPassword(email, password);
}
signIn();

function deletePost(id, postsCollection) {
  postsCollection
    .doc(id)
    .delete();
}
deletePost();

function editPost(newPost, id, postsCollection) {
  postsCollection
    .doc(id)
    .update({
      text: newPost,
    });
}
editPost();
