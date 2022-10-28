import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User('molla@gmail.com',"q2345",true,"Angular")).toBeTruthy();
  });
});
