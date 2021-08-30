import {
  googleLogin,
  signOut,
  saveUserUpdate,
  saveUser,
  registerUser,
  signIn,
  deletePost,
  editPost,
} from './index.js';

describe('googleLogin', () => {
  it('should be a function', () => {
    expect(typeof googleLogin).toBe('function');
  });

  it('should call firebase', () => {
    googleLogin('provider');
    expect(firebase.auth).toBeCalled();
  });
});

describe('saveUserUpdate', () => {
  it('should be a function', () => {
    expect(typeof saveUserUpdate).toBe('function');
  });

  it('should call firebase', () => {
    saveUserUpdate('name');
    expect(firebase.auth).toBeCalled();
  });
});

describe('saveUser', () => {
  it('should be a function', () => {
    expect(typeof saveUser).toBe('function');
  });

  it('should call firebase', () => {
    saveUser('user', 'userEmail', 'userName');
    expect(firebase.auth).toBeCalled();
  });
});

describe('registerUser', () => {
  it('should be a function', () => {
    expect(typeof registerUser).toBe('function');
  });

  it('should call firebase', () => {
    registerUser('email', 'password');
    expect(firebase.auth).toBeCalled();
  });
});

describe('signIn', () => {
  it('should be a function', () => {
    expect(typeof signIn).toBe('function');
  });

  it('should call firebase', () => {
    signIn('email', 'password');
    expect(firebase.auth).toBeCalled();
  });
});

describe('signOut', () => {
  it('should be a function', () => {
    expect(typeof signOut).toBe('function');
  });

  it('should call firebase', () => {
    signOut();
    expect(firebase.auth).toBeCalled();
  });
});

describe('deletePost', () => {
  it('should be a function', () => {
    expect(typeof deletePost).toBe('function');
  });

  it('should call firebase', () => {
    deletePost('id', 'postsCollection');
    expect(firebase.auth).toBeCalled();
  });
});

describe('editPost', () => {
  it('should be a function', () => {
    expect(typeof editPost).toBe('function');
  });

  it('should call firebase', () => {
    editPost('newPost', 'id', 'postsCollection');
    expect(firebase.auth).toBeCalled();
  });
});
