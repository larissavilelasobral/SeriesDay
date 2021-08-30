export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      firebase.firestore().collection('users').doc(user.email)
        .set({
          name: user.displayName,
          id: user.uid,
          photo: user.photoURL,
          email: user.email,
          userId: user.uid,
        }, { merge: true });
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        // eslint-disable-next-line no-alert
        alert('Essa conta já existe com uma credencial diferente');
      }
    });
};

export const signOut = () => {
  firebase.auth().signOut();
  window.location.hash = '';
  window.location.reload();
};

export const saveUserUpdate = (name) => {
  firebase.auth().currentUser.updateProfile({
    displayName: name,
  })
    .then(() => true)
    .catch((error) => error);
};

export const saveUser = (user, userEmail, userName) => {
  firebase.firestore().collection('users').doc(userEmail).set({
    id: user.uid,
    name: userName,
    email: userEmail,
    photo: 'https://firebasestorage.googleapis.com/v0/b/socialnetworklab-48687.appspot.com/o/default-user-img.png?alt=media&token=1a8edc7a-d922-431f-8d10-e91883a3b04d',
  })
    .then(() => true)
    .catch((error) => error);
};

export const registerUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const signIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const deletePost = (id, postsCollection) => {
  postsCollection
    .doc(id)
    .delete();
};

export const editPost = (newPost, id, postsCollection) => {
  postsCollection
    .doc(id)
    .update({
      text: newPost,
    });
};
