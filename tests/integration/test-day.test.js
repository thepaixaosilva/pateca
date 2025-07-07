const request = require('supertest');
const { faker } = require('@faker-js/faker');
const TestDay = require('../../src/models/test-day.model');
const app = require('../../src/app');

// Limpar dados entre cada teste
beforeEach(async () => {
  await TestDay.destroy({ where: {}, force: true });
});

// Função helper para gerar test_type válido
const validTestType = () =>
  faker.helpers.arrayElement([
    '1° BIM. - SATURDAY',
    '2° BIM. - SATURDAY',
    '1° BIM. - MONDAY',
    '2° BIM. - MONDAY',
    'FINALS',
  ]);

describe('Test Day - Create', () => {
  it('should create a new test day with valid data', async () => {
    const res = await request(app)
      .post('/test-days')
      .send({
        test_date: faker.date.future().toISOString().split('T')[0],
        test_type: validTestType(),
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.test_type).toBeTruthy();
  });

  it('should return 400 if the test date is empty', async () => {
    const res = await request(app).post('/test-days').send({
      test_date: '',
      test_type: validTestType(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the test type is empty', async () => {
    const res = await request(app)
      .post('/test-days')
      .send({
        test_date: faker.date.future().toISOString().split('T')[0],
        test_type: '',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the test date is invalid', async () => {
    const res = await request(app).post('/test-days').send({
      test_date: 'invalid-date',
      test_type: validTestType(),
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the test type is invalid', async () => {
    const res = await request(app)
      .post('/test-days')
      .send({
        test_date: faker.date.future().toISOString().split('T')[0],
        test_type: 'INVALIDO',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Test Day - List', () => {
  it('should return all test days', async () => {
    await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).get('/test-days');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('should return a specific test day by ID', async () => {
    const newAvaliacao = await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).get(`/test-days/${newAvaliacao.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newAvaliacao.id);
  });

  it('should return 404 if the test day does not exist', async () => {
    const res = await request(app).get('/test-days/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should filter test days by type', async () => {
    const type = validTestType();
    await TestDay.create({
      test_date: faker.date.future(),
      test_type: type,
    });
    await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).get(
      `/test-days?test_type=${encodeURIComponent(type)}`,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0].test_type).toBe(type);
  });
});

describe('Test Day - Update', () => {
  it('should update the test day data', async () => {
    const newAvaliacao = await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const newDate = faker.date.future().toISOString().split('T')[0];
    const newType = validTestType();
    const res = await request(app).put(`/test-days/${newAvaliacao.id}`).send({
      test_date: newDate,
      test_type: newType,
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.test_type).toBe(newType);
    expect(res.body.test_date).toBe(newDate);
  });

  it('should return 400 if the test date is invalid', async () => {
    const newAvaliacao = await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).put(`/test-days/${newAvaliacao.id}`).send({
      test_date: 'invalid-date',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 when trying to update with invalid type', async () => {
    const newAvaliacao = await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).put(`/test-days/${newAvaliacao.id}`).send({
      test_type: 'INVALIDO',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the test date is empty', async () => {
    const newAvaliacao = await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).put(`/test-days/${newAvaliacao.id}`).send({
      test_date: '',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the test type is empty', async () => {
    const newAvaliacao = await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).put(`/test-days/${newAvaliacao.id}`).send({
      test_type: '',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 when trying to update a non-existent test day', async () => {
    const res = await request(app).put('/test-days/9999').send({
      test_type: validTestType(),
    });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Test Day - Delete', () => {
  it('should delete a test day', async () => {
    const newAvaliacao = await TestDay.create({
      test_date: faker.date.future(),
      test_type: validTestType(),
    });
    const res = await request(app).delete(`/test-days/${newAvaliacao.id}`);
    expect(res.statusCode).toBe(204);
    const found = await TestDay.findByPk(newAvaliacao.id);
    expect(found).toBeNull();
  });

  it('should return 404 when trying to delete a non-existent test day', async () => {
    const res = await request(app).delete('/test-days/9999');
    expect(res.statusCode).toBe(404);
  });
});
