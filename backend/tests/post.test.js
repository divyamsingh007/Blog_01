const request = require('supertest');
const app = require('../app');
const Post = require('../models/Post');
const User = require('../models/User');

describe('Post Endpoints', () => {
  let token;
  let testPost;

  beforeEach(async () => {
    // Setup user and token
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testadmin',
        password: 'password123'
      });
    token = res.body.token;

    // Setup initial post
    testPost = await Post.create({
      title: 'Test Blog Post',
      description: 'Test description',
      content: '<p>Test content</p>',
      category: 'Dev Log'
    });
  });

  it('should fetch all posts', async () => {
    const res = await request(app).get('/api/posts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toEqual(1);
    expect(res.body[0].title).toEqual('Test Blog Post');
  });

  it('should fetch a single post by id', async () => {
    const res = await request(app).get(`/api/posts/${testPost._id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Test Blog Post');
  });

  it('should not create a post without token', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: 'New Post',
        description: 'Desc',
        content: 'Content',
        category: 'Essays'
      });
    expect(res.statusCode).toEqual(401);
  });

  it('should create a post with valid token', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Protected Post',
        description: 'New Desc',
        content: 'New Content',
        category: 'Essays'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('New Protected Post');
  });

  it('should update a post with valid token', async () => {
    const res = await request(app)
      .put(`/api/posts/${testPost._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Title'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Title');
  });

  it('should delete a post with valid token', async () => {
    const res = await request(app)
      .delete(`/api/posts/${testPost._id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Post removed');

    const fetchRes = await request(app).get('/api/posts');
    expect(fetchRes.body.length).toEqual(0);
  });
});
