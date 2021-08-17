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
};

const postsCollection = firebase.firestore().collection('posts');

export const deletePost = (id) => {
  postsCollection
    .doc(id)
    .delete();
};

export const editPost = (newPost, id) => {
  postsCollection
    .doc(id)
    .update({
      text: newPost,
    });
};

export const saveUserUpdate = (name) => {
  firebase.auth().currentUser.updateProfile({
    displayName: name
  })
    .then(() => true)
    .catch((error) => error);
};

export const saveUser = (user, userEmail, userName) => {
  firebase.firestore().collection('users').doc(userEmail).set({
    userId: user.uid,
    name: userName,
    email: userEmail,
    photo: 'https://avatars.githubusercontent.com/patbarnabe'
  })
    .then(() => true)
    .catch((error) => error);
};

export const registerUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);
