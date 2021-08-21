import Login from './index.js';
import * as services from '../../services/index.js';

services.googleLogin = jest.fn(() => Promise.resolve(true));
services.registerUser = jest.fn(() => Promise.resolve(true));

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });

  it('should load the page', () => {
    expect(Login()).toMatchSnapshot();
  });

  // it('When the user clicks the button, he should call sign with email and password', () => {
  //   Login().querySelector('#button-login').dispatchEvent(new Event('click'));
  //   expect(services.signIn).toHaveBeenCalled();
  // });

  // it('When the user clicks the button he should call sign with google account', () => {
  //   Login().querySelector('#button-google').dispatchEvent(new Event('click'));
  //   expect(services.loginWithGoogle).toHaveBeenCalled();
  // });

  // it('When the user clicks the button, they should redirect to the registration page', () => {
  //   Login().querySelector('#button-create-account').dispatchEvent(new Event('click'));
  //   expect(utils.onNavigate).toHaveBeenCalledWith('/register');
  // });
});

//   describe('Login', () => {
//     it('should be a function', () => {
//       expect(typeof Login).toBe('function');
//     });

//     it('should load the page', () => {
//       expect(Login()).toMatchSnapshot();
//     });

//     it('should have a button with click event to sign in with email and password', () => {
//       Login().querySelector('#btn-login').dispatchEvent(new Event('click'));
//       expect(services.emailAndPasswordLogin).toHaveBeenCalled();
//       expect(services.emailAndPasswordLogin()).toBe(true);
//     });

//     it('should have a button with click event to sign in with google account', () => {
//       Login().querySelector('#btn-google').dispatchEvent(new Event('click'));
//       expect(services.googleLogin).toHaveBeenCalled();
//       expect(services.googleLogin()).toBe(true);
//     });
//     it('should have a button with click event to redirect user to sign up page', () => {
//       Login().querySelector('#sign-up-login').dispatchEvent(new Event('click'));
//       expect(utils.onNavigate).toBeCalledWith('/signup');
//     });
//   });

// importamos a função que vamos testar
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('should be a function', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });

/*
import { registerAccount } from '../src/lib/auth.js';

describe('Register', () => {
  it('should be a function', () => {
    expect(typeof registerAccount).toBe('function');
  });
  it('shold call firebase', () => {
    registerAccount();
    expect(firebase.auth().createUserWithEmailAndPassword()).toBeCalled();
  });
});
*/
