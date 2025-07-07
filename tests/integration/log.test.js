const request = require('supertest');
const { faker } = require('@faker-js/faker');
const Logs = require('../../src/models/log.model');
const User = require('../../src/models/user.model');
const app = require('../../src/app');

// Limpar dados entre cada teste
beforeEach(async () => {
  await Logs.destroy({ where: {}, force: true });
  await User.destroy({ where: {}, force: true });
});

// Função helper para gerar RA único
const generateUniqueRA = () => {
  return faker.string.numeric(13);
};

describe('Log - Create', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
  });

  it('should create a new log with valid data', async () => {
    const res = await request(app)
      .post('/logs')
      .send({
        data_hora: new Date().toISOString(),
        action: faker.helpers.arrayElement([
          'LOGIN',
          'LOGOUT',
          'CREATE',
          'UPDATE',
          'DELETE',
        ]),
        description: faker.lorem.sentence(),
        fk_user_id: user.id,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.action).toBeTruthy();
  });

  it('should return 400 if the action is empty', async () => {
    const res = await request(app).post('/logs').send({
      data_hora: new Date().toISOString(),
      action: '',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the user ID is invalid', async () => {
    const res = await request(app).post('/logs').send({
      data_hora: new Date().toISOString(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: 99999,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the date/time is invalid', async () => {
    const res = await request(app).post('/logs').send({
      data_hora: 'invalid-date',
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should create a log with the current date/time if not provided', async () => {
    const res = await request(app).post('/logs').send({
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('data_hora');
  });
});

describe('Log - List', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
  });

  it('should return all logs', async () => {
    await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    await Logs.create({
      data_hora: new Date(),
      action: 'LOGOUT',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    const res = await request(app).get('/logs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('should return a specific log by ID', async () => {
    const newLog = await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    const res = await request(app).get(`/logs/${newLog.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newLog.id);
  });

  it('should return 404 if the log does not exist', async () => {
    const res = await request(app).get('/logs/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should filter logs by user', async () => {
    const anotherUser = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: anotherUser.id,
    });
    const res = await request(app).get(`/logs?user=${user.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].fk_user_id).toBe(user.id);
  });

  it('should filter logs by action', async () => {
    await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    await Logs.create({
      data_hora: new Date(),
      action: 'LOGOUT',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    const res = await request(app).get('/logs?action=LOGIN');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].action).toBe('LOGIN');
  });

  it('should filter logs by date period', async () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    await Logs.create({
      data_hora: yesterday,
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    await Logs.create({
      data_hora: today,
      action: 'LOGOUT',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    const dataInicio = today.toISOString().split('T')[0];
    const res = await request(app).get(`/logs?data_inicio=${dataInicio}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('should order logs by date/time (most recent first)', async () => {
    const newer = new Date();
    const older = new Date(newer.getTime() - 3600000);
    await Logs.create({
      data_hora: older,
      action: 'LOGIN',
      description: 'Log mais antigo',
      fk_user_id: user.id,
    });
    await Logs.create({
      data_hora: newer,
      action: 'LOGOUT',
      description: 'Log mais recente',
      fk_user_id: user.id,
    });
    const res = await request(app).get('/logs');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(2);
    expect(res.body[0].description).toBe('Log mais recente');
    expect(res.body[1].description).toBe('Log mais antigo');
  });
});

describe('Log - Update', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
  });

  it('should update the log description', async () => {
    const newLog = await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    const newDescription = faker.lorem.sentence();
    const res = await request(app).put(`/logs/${newLog.id}`).send({
      description: newDescription,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toBe(newDescription);
  });

  it('should return 404 when trying to update a non-existent log', async () => {
    const res = await request(app).put('/logs/9999').send({
      description: faker.lorem.sentence(),
    });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should not allow changing critical fields (action, date/time, user_id)', async () => {
    const newLog = await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    const res = await request(app).put(`/logs/${newLog.id}`).send({
      action: 'LOGOUT',
      data_hora: new Date().toISOString(),
      fk_user_id: 999,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Log - Delete', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'admin',
      password: faker.internet.password(),
    });
  });

  it('should delete a log (admin only)', async () => {
    const newLog = await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: user.id,
    });
    const res = await request(app).delete(`/logs/${newLog.id}`);
    expect(res.statusCode).toBe(204);
    const found = await Logs.findByPk(newLog.id);
    expect(found).toBeNull();
  });

  it('should return 404 when trying to delete a non-existent log', async () => {
    const res = await request(app).delete('/logs/9999');
    expect(res.statusCode).toBe(404);
  });

  it('should return 403 if user is not admin', async () => {
    const commonUser = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const newLog = await Logs.create({
      data_hora: new Date(),
      action: 'LOGIN',
      description: faker.lorem.sentence(),
      fk_user_id: commonUser.id,
    });
    const res = await request(app).delete(`/logs/${newLog.id}`);
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Log - Audit', () => {
  let user;

  beforeEach(async () => {
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
  });

  it('should automatically create a log when logging in', async () => {
    // Simula login
    await request(app).post('/auth/login').send({
      email: user.email,
      password: 'senha123',
    });
    const logs = await Logs.findAll({
      where: { fk_user_id: user.id, action: 'LOGIN' },
    });
    expect(logs.length).toBeGreaterThan(0);
  });

  it('should automatically create a log when logging out', async () => {
    await request(app).post('/auth/logout').send({
      fk_user_id: user.id,
    });
    const logs = await Logs.findAll({
      where: { fk_user_id: user.id, action: 'LOGOUT' },
    });
    expect(logs.length).toBeGreaterThan(0);
  });

  it('should automatically create a log when creating a user', async () => {
    await request(app).post('/users').send({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    const logs = await Logs.findAll({ where: { action: 'CREATE' } });
    expect(logs.length).toBeGreaterThan(0);
  });
});
