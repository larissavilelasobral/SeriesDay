global.firebase = {
  auth: jest.fn(() => ({
    GoogleAuthProvider: jest.fn(),
    signInWithPopup: jest.fn(),
    currentUser: jest.fn(() => ({
      updateProfile: jest.fn(),
    })),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChanged: jest.fn(),
    // eslint-disable-next-line no-dupe-keys
    currentUser: {
      uid: 1,
    },
  })),
  //  collection: jest.fn(() => ({
  //   add: jest.fn(),
  //   orderBy: jest.fn(() => ({
  //     get: jest.fn(),
  //   })),
  //   doc: jest.fn(() => ({
  //     set: jest.fn(),
  //     update: jest.fn(),
  //     delete: jest.fn(),
  //   })),
  //   currentUser: {
  //     uid: 1,
  //   },
  // })),
  firestore: jest.fn(() => ({
    collection: jest.fn(() => ({
      add: jest.fn(),
      orderBy: jest.fn(() => ({
        get: jest.fn(),
      })),
      doc: jest.fn(() => ({
        set: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      })),
    })),
    currentUser: {
      uid: 1,
    },
  })),
};
