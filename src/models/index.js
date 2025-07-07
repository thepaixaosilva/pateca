const User = require('./user.model');
const Subject = require('./subject.model');
const UserSubjects = require('./user-subjects.model');
const AnswerKey = require('./answer-key.model');
const TestDay = require('./test-day.model');
const StudentAnswers = require('./student-answers.model');
const Logs = require('./log.model');

// Associações Many-to-Many entre User e Disciplina
User.belongsToMany(Subject, {
  through: UserSubjects,
  foreignKey: 'fk_user_id',
  otherKey: 'fk_subject_id',
});

Subject.belongsToMany(User, {
  through: UserSubjects,
  foreignKey: 'fk_subject_id',
  otherKey: 'fk_user_id',
});

// Associações One-to-Many entre Avaliacao e GabaritoOficial
TestDay.hasMany(AnswerKey, {
  foreignKey: 'fk_test_day_id',
});

AnswerKey.belongsTo(TestDay, {
  foreignKey: 'fk_test_day_id',
});

// Associações One-to-Many entre Disciplina e GabaritoOficial
Subject.hasMany(AnswerKey, {
  foreignKey: 'fk_subject_id',
});

AnswerKey.belongsTo(Subject, {
  foreignKey: 'fk_subject_id',
});

// Associações One-to-Many entre GabaritoOficial e FolhaRespostas
AnswerKey.hasMany(StudentAnswers, {
  foreignKey: 'fk_answer_key_id',
});

StudentAnswers.belongsTo(AnswerKey, {
  foreignKey: 'fk_answer_key_id',
});

// Associações One-to-Many entre User e FolhaRespostas
User.hasMany(StudentAnswers, {
  foreignKey: 'fk_user_id',
});

StudentAnswers.belongsTo(User, {
  foreignKey: 'fk_user_id',
});

// Associações One-to-Many entre User e Logs
User.hasMany(Logs, {
  foreignKey: 'fk_user_id',
});

Logs.belongsTo(User, {
  foreignKey: 'fk_user_id',
});

module.exports = {
  User,
  Subject,
  UserSubjects,
  AnswerKey,
  TestDay,
  StudentAnswers,
  Logs,
};
