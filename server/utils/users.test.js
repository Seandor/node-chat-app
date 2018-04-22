const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Betty',
      room: 'Node Course'
    },
    {
      id: '2',
      name: 'Mike',
      room: 'Angular Course'
    },
    {
      id: '3',
      name: 'Julie',
      room: 'Angular Course'
    }];
  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Sean',
      room: 'Dark Souls Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    var userId = '1';
    var user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user with a non-exist id', () => {
    var userId = '11';
    var user = users.removeUser(userId);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    var userId = '2';
    var user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find user if pass a non-exist id', () => {
    var userId = '22';
    var user = users.getUser(userId);
    expect(user).toBeFalsy();
  });

  it('should return names for Angular Course', () => {
    var userList = users.getUserList('Angular Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Betty']);
  });
});