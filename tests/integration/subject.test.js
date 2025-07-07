const request = require('supertest');
const { faker } = require('@faker-js/faker');
const Subject = require('../../src/models/subject.model');
const app = require('../../src/app');

// Limpar dados entre cada teste
beforeEach(async () => {
  await Subject.destroy({ where: {}, force: true });
});

// Função helper para gerar códigos únicos
const generateUniqueCode = () => {
  return faker.string.alphanumeric(8).toUpperCase();
};

describe('Subject - Create', () => {
  it('should create a new subject with valid data', async () => {
    const res = await request(app)
      .post('/subjects')
      .send({
        subject_code: generateUniqueCode(),
        name: faker.lorem.words(3),
        semester: faker.helpers.arrayElement([
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
        ]),
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('subject_code');
    expect(res.body.name).toBeTruthy();
  });

  it('should return 400 if the subject code is invalid (not in aaa000 format)', async () => {
    const res = await request(app)
      .post('/subjects')
      .send({
        subject_code: 'invalido',
        name: faker.lorem.words(3),
        semester: '1',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the subject code is empty', async () => {
    const res = await request(app)
      .post('/subjects')
      .send({
        subject_code: '',
        name: faker.lorem.words(3),
        semester: '1',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the subject name is empty', async () => {
    const res = await request(app).post('/subjects').send({
      subject_code: generateUniqueCode(),
      name: '',
      semester: '1',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the semester is empty', async () => {
    const res = await request(app)
      .post('/subjects')
      .send({
        subject_code: generateUniqueCode(),
        name: faker.lorem.words(3),
        semester: '',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the semester is invalid', async () => {
    const res = await request(app)
      .post('/subjects')
      .send({
        subject_code: generateUniqueCode(),
        name: faker.lorem.words(3),
        semester: 'invalido',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 409 if the subject code already exists', async () => {
    const codigo = generateUniqueCode();
    await Subject.create({
      subject_code: codigo,
      name: faker.lorem.words(3),
      semester: '1',
    });
    const res = await request(app)
      .post('/subjects')
      .send({
        subject_code: codigo,
        name: faker.lorem.words(3),
        semester: '2',
      });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Subject - List', () => {
  it('should return all subjects', async () => {
    await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '1',
    });
    await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '2',
    });
    const res = await request(app).get('/subjects');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  it('should return a specific subject by code', async () => {
    const newDisciplina = await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '1',
    });
    const res = await request(app).get(
      `/subjects/${newDisciplina.subject_code}`,
    );
    expect(res.statusCode).toBe(200);
    expect(res.body.subject_code).toBe(newDisciplina.subject_code);
  });

  it('should return 404 if the subject does not exist', async () => {
    const res = await request(app).get('/subjects/INEXISTENTE');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Subject - Update', () => {
  it('should update the subject data', async () => {
    const newDisciplina = await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '1',
    });
    const updatedName = faker.lorem.words(4);
    const res = await request(app)
      .put(`/subjects/${newDisciplina.subject_code}`)
      .send({
        name: updatedName,
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe(updatedName);
  });

  it('should return 400 if the subject name is empty', async () => {
    const newDisciplina = await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '1',
    });
    const res = await request(app)
      .put(`/subjects/${newDisciplina.subject_code}`)
      .send({
        name: '',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the semester is invalid', async () => {
    const newDisciplina = await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '1',
    });
    const res = await request(app)
      .put(`/subjects/${newDisciplina.subject_code}`)
      .send({
        semester: 'invalido',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if the semester is empty', async () => {
    const newDisciplina = await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '1',
    });
    const res = await request(app)
      .put(`/subjects/${newDisciplina.subject_code}`)
      .send({
        semester: '',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 409 when trying to update to an already existing code', async () => {
    const code1 = generateUniqueCode();
    const code2 = generateUniqueCode();
    await Subject.create({
      subject_code: code1,
      name: faker.lorem.words(3),
      semester: '1',
    });
    const subj2 = await Subject.create({
      subject_code: code2,
      name: faker.lorem.words(3),
      semester: '2',
    });
    const res = await request(app)
      .put(`/subjects/${subj2.subject_code}`)
      .send({ subject_code: code1 });
    expect(res.statusCode).toBe(409);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 404 when trying to update a non-existent subject', async () => {
    const res = await request(app)
      .put('/subjects/INEXISTENTE')
      .send({
        name: faker.lorem.words(3),
      });
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
  });
});

describe('Subject - Delete', () => {
  it('should delete a subject', async () => {
    const newDisciplina = await Subject.create({
      subject_code: generateUniqueCode(),
      name: faker.lorem.words(3),
      semester: '1',
    });
    const res = await request(app).delete(
      `/subjects/${newDisciplina.subject_code}`,
    );
    expect(res.statusCode).toBe(204);
    const found = await Subject.findByPk(newDisciplina.subject_code);
    expect(found).toBeNull();
  });

  it('should return 404 when trying to delete a non-existent subject', async () => {
    const res = await request(app).delete('/subjects/INEXISTENTE');
    expect(res.statusCode).toBe(404);
  });
});
