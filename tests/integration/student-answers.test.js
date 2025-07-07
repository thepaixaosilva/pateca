const request = require('supertest');
const { faker } = require('@faker-js/faker');
const StudentAnswers = require('../../src/models/student-answers.model');
const AnswerKey = require('../../src/models/answer-key.model');
const Subject = require('../../src/models/subject.model');
const TestDay = require('../../src/models/test-day.model');
const User = require('../../src/models/user.model');
const app = require('../../src/app');

// Limpar dados entre cada teste
beforeEach(async () => {
  await StudentAnswers.destroy({ where: {}, force: true });
  await AnswerKey.destroy({ where: {}, force: true });
  await User.destroy({ where: {}, force: true });
  await Subject.destroy({ where: {}, force: true });
  await TestDay.destroy({ where: {}, force: true });
});

// Função helper para gerar códigos únicos
const generateUniqueCode = () => {
  return faker.string.alphanumeric(8).toUpperCase();
};

// Função helper para gerar RA único
const generateUniqueRA = () => {
  return faker.string.numeric(13);
};

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
  subject_code: generateUniqueCode(),
  name: faker.commerce.productName(),
  semester: 1,
});

// Função helper para criar um TestDay válido
const defaultTestDayData = () => ({
  test_date: new Date(),
  test_type: '1° BIM. - SATURDAY',
});

describe('Student Answer Sheet - Create', () => {
  let user;
  let answerKey;

  beforeEach(async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    answerKey = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
  });

  it('should create a new answer sheet with valid data', async () => {
    const answers = generateRandomAnswers();
    const res = await request(app)
      .post('/student-answers')
      .send({
        fk_answer_key_id: answerKey.id,
        fk_user_id: user.id,
        ...answers,
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.fk_answer_key_id).toBe(answerKey.id);
  });

  it('should return 400 if the answerKey code is empty', async () => {
    const answers = generateRandomAnswers();
    const res = await request(app)
      .post('/student-answers')
      .send({
        fk_answer_key_id: '',
        fk_user_id: user.id,
        ...answers,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the user ID is invalid', async () => {
    const answers = generateRandomAnswers();
    const res = await request(app)
      .post('/student-answers')
      .send({
        fk_answer_key_id: answerKey.id,
        fk_user_id: 99999,
        ...answers,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if any question has an invalid answer', async () => {
    const res = await request(app).post('/student-answers').send({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      answer_1: 'X',
      answer_2: 'A',
      answer_3: 'B',
      answer_4: 'C',
      answer_5: 'D',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Student Answer Sheet - List', () => {
  let user;
  let answerKey;

  beforeEach(async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    answerKey = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
  });

  it('should return all answer sheets', async () => {
    await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 8.5,
      ...generateRandomAnswers(),
    });
    await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 7.2,
      ...generateRandomAnswers(),
    });
    const res = await request(app).get('/student-answers');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('should return a specific answer sheet by ID', async () => {
    const newAnswers = await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 8.5,
      ...generateRandomAnswers(),
    });
    const res = await request(app).get(`/student-answers/${newAnswers.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(newAnswers.id);
  });

  it('should return 404 if the answer sheet does not exist', async () => {
    const res = await request(app).get('/student-answers/9999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('should filter answer sheets by user', async () => {
    const anotherUser = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 8.5,
      ...generateRandomAnswers(),
    });
    await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: anotherUser.id,
      score: 7.2,
      ...generateRandomAnswers(),
    });
    const res = await request(app).get(`/student-answers?user=${user.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].fk_user_id).toBe(user.id);
  });
});

describe('Student Answer Sheet - Update', () => {
  let user;
  let answerKey;

  beforeEach(async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    answerKey = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
  });

  it('should update the answers of the answer sheet', async () => {
    const newAnswers = await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 8.5,
      ...generateRandomAnswers(),
    });
    const res = await request(app)
      .put(`/student-answers/${newAnswers.id}`)
      .send({
        answer_1: 'E',
        answer_2: 'D',
        score: 9.0,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.answer_1).toBe('E');
    expect(res.body.answer_2).toBe('D');
    expect(res.body.score).toBe(9.0);
  });

  it('should return 400 when trying to update with invalid answer', async () => {
    const newAnswers = await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 8.5,
      ...generateRandomAnswers(),
    });
    const res = await request(app)
      .put(`/student-answers/${newAnswers.id}`)
      .send({
        answer_1: 'X',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 when trying to update with invalid score', async () => {
    const newAnswers = await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 8.5,
      ...generateRandomAnswers(),
    });
    const res = await request(app)
      .put(`/student-answers/${newAnswers.id}`)
      .send({
        score: 15,
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 when trying to update a non-existent answer sheet', async () => {
    const res = await request(app).put('/student-answers/9999').send({
      answer_1: 'A',
    });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Student Answer Sheet - Delete', () => {
  let user;
  let answerKey;

  beforeEach(async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    answerKey = await AnswerKey.create({
      ...generateRandomAnswers(),
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
  });

  it('should delete an answer sheet', async () => {
    const newAnswers = await StudentAnswers.create({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      score: 8.5,
      ...generateRandomAnswers(),
    });
    const res = await request(app).delete(`/student-answers/${newAnswers.id}`);
    expect(res.statusCode).toBe(204);
    const found = await StudentAnswers.findByPk(newAnswers.id);
    expect(found).toBeNull();
  });

  it('should return 404 when trying to delete a non-existent answer sheet', async () => {
    const res = await request(app).delete('/student-answers/9999');
    expect(res.statusCode).toBe(404);
  });
});

describe('Student Answer Sheet - Auto Correction', () => {
  let user;
  let answerKey;

  beforeEach(async () => {
    const subject = await Subject.create(defaultSubjectData());
    const testDay = await TestDay.create(defaultTestDayData());
    user = await User.create({
      ra: generateUniqueRA(),
      email: faker.internet.email(),
      full_name: faker.person.fullName(),
      role: 'student',
      password: faker.internet.password(),
    });
    answerKey = await AnswerKey.create({
      answer_1: 'A',
      answer_2: 'B',
      answer_3: 'C',
      answer_4: 'D',
      answer_5: 'E',
      fk_subject_id: subject.id,
      fk_test_day_id: testDay.id,
    });
  });

  it('should calculate the correct score based on the answerKey', async () => {
    const res = await request(app).post('/student-answers').send({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      answer_1: 'A',
      answer_2: 'B',
      answer_3: 'C',
      answer_4: 'A',
      answer_5: 'A',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.score).toBe(6.0);
  });

  it('should return score 10 for all correct answers', async () => {
    const res = await request(app).post('/student-answers').send({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      answer_1: 'A',
      answer_2: 'B',
      answer_3: 'C',
      answer_4: 'D',
      answer_5: 'E',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.score).toBe(10.0);
  });

  it('should return score 0 for all incorrect answers', async () => {
    const res = await request(app).post('/student-answers').send({
      fk_answer_key_id: answerKey.id,
      fk_user_id: user.id,
      answer_1: 'E',
      answer_2: 'E',
      answer_3: 'E',
      answer_4: 'E',
      answer_5: 'A',
    });
    expect(res.statusCode).toBe(201);
    expect(res.body.score).toBe(0.0);
  });
});
