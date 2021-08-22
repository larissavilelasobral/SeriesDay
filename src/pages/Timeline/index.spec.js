import * as services from '../../services/index.js';
import { Timeline } from './mock.js';

services.signOut = jest.fn(() => Promise.resolve(true));
const timelinePage = Timeline();

describe('Timeline', () => {
  it('should be a function', () => {
    expect(typeof Timeline).toBe('function');
  });

  it('should load the page', () => {
    expect(Timeline()).toMatchSnapshot();
  });
});

describe('signOut', () => {
  it('should be a function', () => {
    expect(typeof services.signOut).toBe('function');
  });

  it('When the user clicks the button, he should sign out from the site on mobile version', () => {
    timelinePage.querySelector('#signout-button').dispatchEvent(new Event('click'));
    expect(services.signOut).toBeCalled();
  });

  it('When the user clicks the button, he should sign out from the site on desktop version ', () => {
    timelinePage.querySelector('#desktop-signout-button').dispatchEvent(new Event('click'));
    expect(services.signOut).toBeCalled();
  });
});

describe('deletePost', () => {
  it('should be a function', () => {
    expect(typeof services.deletePost).toBe('function');
  });
});

describe('editPost', () => {
  it('should be a function', () => {
    expect(typeof services.editPost).toBe('function');
  });
});
