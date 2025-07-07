const request = require('supertest');
const { faker } = require('@faker-js/faker');
const User = require('../../src/models/user.model');
const app = require('../../src/app');

beforeEach(async () => {
  await User.destroy({ where: {}, force: true });
});

const generateUniqueRA = () => {
  return faker.string.numeric(13);
};

describe('User - CREATE', () => {
  it('should create a new user with valid data', async () => {
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.full_name).toBeTruthy();
  });

  it('should return 400 if RA is invalid (not 13 digits)', async () => {
    const res = await request(app).post('/users').send({
      ra: '123456',
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if RA is invalid (non-numeric)', async () => {
    const res = await request(app).post('/users').send({
      ra: 'ABCDEFGHIJKLM',
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if email is invalid', async () => {
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: 'invalid-email',
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if ra is empty', async () => {
    const res = await request(app).post('/users').send({
      ra: '',
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if email is empty', async () => {
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: '',
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if name is empty', async () => {
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: '',
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if role is empty', async () => {
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: '',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if password is empty', async () => {
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: '',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if role is invalid', async () => {
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'invalidrole',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 409 if RA already exists', async () => {
    const ra = generateUniqueRA();
    await User.create({
      ra,
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app).post('/users').send({
      ra,
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 409 if email already exists', async () => {
    const email = faker.internet.email();
    await User.create({
      ra: generateUniqueRA(),
      email,
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email,
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });
});

describe('User - READ', () => {
  it('should return an existent user by ID', async () => {
    const newUser = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app).get(`/users/${newUser.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(newUser.email);
  });

  it('should return 404 if user does not exist', async () => {
    const res = await request(app).get('/users/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('User - UPDATE', () => {
  it('should update the user data', async () => {
    const newUser = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const updatedName = faker.person.fullName();
    const res = await request(app).put(`/users/${newUser.id}`).send({
      full_name: updatedName,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.full_name).toBe(updatedName);
  });

  it('should return 409 after attempting to update to an already existent RA', async () => {
    const ra1 = generateUniqueRA();
    const ra2 = generateUniqueRA();

    await User.create({
      ra: ra1,
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });

    const u2 = await User.create({
      ra: ra2,
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });

    const res = await request(app).put(`/users/${u2.id}`).send({ ra: ra1 });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 409 after attempting to update to an already existent email', async () => {
    const email1 = faker.internet.email();
    const email2 = faker.internet.email();

    await User.create({
      ra: generateUniqueRA(),
      email: email1,
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });

    const u2 = await User.create({
      ra: generateUniqueRA(),
      email: email2,
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });

    const res = await request(app)
      .put(`/users/${u2.id}`)
      .send({ email: email1 });

    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if RA is invalid (not 13 digits)', async () => {
    const user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ ra: '123456' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if RA is invalid (non-numeric)', async () => {
    const user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ ra: 'ABCDEFGHIJKLM' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if email is invalid', async () => {
    const user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ email: 'invalid-email' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if full_name is empty', async () => {
    const user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ full_name: '' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if role is invalid', async () => {
    const user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app)
      .put(`/users/${user.id}`)
      .send({ role: 'invalidrole' });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 when updating a non-existent user', async () => {
    const res = await request(app)
      .put('/users/9999')
      .send({ full_name: 'Novo Nome' });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('User - DELETE', () => {
  it('should delete an user', async () => {
    const newUser = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const res = await request(app).delete(`/users/${newUser.id}`);
    expect(res.statusCode).toBe(204);
    const found = await User.findByPk(newUser.id);
    expect(found).toBeNull();
  });

  it('should return 404 after attempting to delete a non-existent user', async () => {
    const res = await request(app).delete('/users/9999');
    expect(res.statusCode).toBe(404);
  });
});
