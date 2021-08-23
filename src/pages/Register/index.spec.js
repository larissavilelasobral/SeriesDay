import * as services from '../../services/index.js';
import { Register } from './mock.js';

services.registerUser = jest.fn(() => Promise.resolve(true));
services.saveUser = jest.fn(() => Promise.resolve(true));
services.saveUserUpdate = jest.fn(() => Promise.resolve(true));

describe('Register', () => {
  it('should be a function', () => {
    expect(typeof Register).toBe('function');
  });

  it('should load the page', () => {
    expect(Register()).toMatchSnapshot();
  });

  it('when the user clicks the button he must have completed the registration', () => {
    Register().querySelector('#signup-button-register').dispatchEvent(new Event('click'));
    expect(services.registerUser).toHaveBeenCalled();
  });

  it('When the user clicks create account, the registration must be saved', () => {
    Register().querySelector('#signup-button-register').dispatchEvent(new Event('click'));
    expect(services.saveUserUpdate).toHaveBeenCalled();
    expect(services.saveUser).toHaveBeenCalled();
  });
});
