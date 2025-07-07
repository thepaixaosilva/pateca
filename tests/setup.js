const db = require('../src/config/database/database.config');

beforeAll(async () => db.sync({ force: true }));
afterAll(async () => db.close());
