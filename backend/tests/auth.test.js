const request = require('supertest');
const app = require('../app');
const User = require('../models/User');

describe('Auth Endpoints', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      username: 'testadmin',
      password: 'testpassword123'
    });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'newadmin',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.username).toEqual('newadmin');
  });

  it('should logic an existing user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testadmin',
        password: 'testpassword123'
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.username).toEqual('testadmin');
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testadmin',
        password: 'wrongpassword'
      });
    
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('Invalid username or password');
  });
});
