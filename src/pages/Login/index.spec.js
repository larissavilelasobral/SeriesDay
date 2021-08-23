import * as services from '../../services/index.js';
import { Login } from './mock.js';

services.signIn = jest.fn(() => Promise.resolve(true));
services.googleLogin = jest.fn(() => Promise.resolve(true));

const loginPage = Login();

describe('Login', () => {
  it('should be a function', () => {
    expect(typeof Login).toBe('function');
  });

  it('should load the page', () => {
    expect(Login()).toMatchSnapshot();
  });

  it('When the user clicks the button he should call sign with google account', () => {
    Login().querySelector('#google-button').dispatchEvent(new Event('click'));
    expect(services.googleLogin).toBeCalled();
  });
});

describe('signIn', () => {
  it('should be a function', () => {
    expect(typeof services.signIn).toBe('function');
  });

  it('When the user clicks the button, he should call sign with email and password', () => {
    loginPage.querySelector('#email').value = 'teste@gmail.com';
    loginPage.querySelector('#password').value = '123456';
    loginPage.querySelector('#signin-button').dispatchEvent(new Event('click'));
    expect(services.signIn).toBeCalled();
    expect(services.signIn).toHaveBeenCalledWith('teste@gmail.com', '123456');
  });
});
