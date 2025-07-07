const request = require('supertest');
const { faker } = require('@faker-js/faker');
const AnswerKey = require('../../src/models/answer-key.model');
const Subject = require('../../src/models/subject.model');
const TestDay = require('../../src/models/test-day.model');
const app = require('../../src/app');

// Limpar dados entre cada teste
beforeEach(async () => {
  await AnswerKey.destroy({ where: {}, force: true });
  await Subject.destroy({ where: {}, force: true });
  await TestDay.destroy({ where: {}, force: true });
});

// Função helper para gerar respostas aleatórias
const generateRandomAnswers = () => {
  const answers = ['A', 'B', 'C', 'D', 'E'];
  return {
    answer_1: faker.helpers.arrayElement(answers),
    answer_2: faker.helpers.arrayElement(answers),
    answer_3: faker.helpers.arrayElement(answers),
    answer_4: faker.helpers.arrayElement(answers),
    answer_5: faker.helpers.arrayElement(answers),
  };
};

// Função helper para criar um Subject válido
const defaultSubjectData = () => ({
  subject_code: faker.string.alphanumeric(6).toUpperCase(),
  name: faker.commerce.productName(),
  semester: 1,
});

// Função helper para criar um TestDay válido
const defaultTestDayData = () => ({
  test_date: new Date(),
  test_type: '1° BIM. - SATURDAY',
});

describe('Official Answer Key - Create', () => {
  it('should create a new official answer key with valid data', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const answers = generateRandomAnswers();
    const res = await request(app)
      .post('/answer-keys')
      .send({
        ...answers,
        fk_subject_id: subject.id,
        fk_test_day_id: testDay.id,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 400 if subject or test day is missing', async () => {
    const answers = generateRandomAnswers();
    const res = await request(app)
      .post('/answer-keys')
      .send({
        ...answers,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if there are no answers', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const res = await request(app).post('/answer-keys').send({
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if fk_subject_id does not match any subject', async () => {
    const testDay = await TestDay.create(defaultTestDayData());
    const res = await request(app)
      .post('/answer-keys')
      .send({
        fk_subject_id: '9999',
        fk_test_day_id: testDay.id,
        ...generateRandomAnswers(),
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if fk_test_day_id does not match any test day', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const res = await request(app)
      .post('/answer-keys')
      .send({
        fk_subject_id: subject.id,
        fk_test_day_id: '9999',
        ...generateRandomAnswers(),
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 409 if an answer key already exists for the same subject and test day', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const answers = generateRandomAnswers();
    await AnswerKey.create({
      ...answers,
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    const res = await request(app)
      .post('/answer-keys')
      .send({
        ...generateRandomAnswers(),
        fk_subject_id: subject.id,
        fk_test_day_id: testDay.id,
      });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Official Answer Key - List', () => {
  it('should return all official answer keys', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    const res = await request(app).get('/answer-keys');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('should return a specific official answer key by ID', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const newGabarito = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    const res = await request(app).get(`/answer-keys/${newGabarito.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newGabarito.id);
  });

  it('should return 400 if there are no answers', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const res = await request(app).post('/answer-keys').send({
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if fk_subject_id does not match any subject', async () => {
    await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const res = await request(app).post('/answer-keys').send({
      fk_subject_id: '9999',
      fk_test_day_id: testDay.id,
      answer_1: 'X', // resposta inválida
      answer_2: 'A',
      answer_3: 'B',
      answer_4: 'C',
      answer_5: 'D',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if fk_test_day_id does not match any test day', async () => {
    const subject = await Subject.create(defaultSubjectData());
    await TestDay.create(defaultTestDayData());
    const res = await request(app).post('/answer-keys').send({
      fk_subject_id: subject.id,
      fk_test_day_id: '9999',
      answer_1: 'X', // resposta inválida
      answer_2: 'A',
      answer_3: 'B',
      answer_4: 'C',
      answer_5: 'D',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 409 if an answer key already exists for the same subject and test day', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const answers = generateRandomAnswers();

    await AnswerKey.create({
      ...answers,
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });

    const res = await request(app)
      .post('/answer-keys')
      .send({
        ...generateRandomAnswers(),
        fk_subject_id: subject.id,
        fk_test_day_id: testDay.id,
      });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 if the official answer key does not exist', async () => {
    const res = await request(app).get('/answer-keys/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Official Answer Key - Update', () => {
  it('should update the answers of the official answer key', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const newGabarito = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    const res = await request(app).put(`/answer-keys/${newGabarito.id}`).send({
      answer_1: 'E',
      answer_2: 'D',
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer_1).toBe('E');
    expect(res.body.answer_2).toBe('D');
  });

  it('should return 400 when trying to update with invalid answer', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const newGabarito = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    const res = await request(app).put(`/answer-keys/${newGabarito.id}`).send({
      answer_1: 'X',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 when trying to update a non-existent answer key', async () => {
    const res = await request(app).put('/answer-keys/9999').send({
      answer_1: 'A',
    });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Official Answer Key - Delete', () => {
  it('should delete an official answer key', async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    const newGabarito = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
    const res = await request(app).delete(`/answer-keys/${newGabarito.id}`);
    expect(res.statusCode).toBe(204);
    const found = await AnswerKey.findByPk(newGabarito.id);
    expect(found).toBeNull();
  });

  it('should return 404 when trying to delete a non-existent official answer key', async () => {
    const res = await request(app).delete('/answer-keys/9999');
    expect(res.statusCode).toBe(404);
  });
});
