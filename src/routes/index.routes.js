import express from "express";
const routes = express.Router();

import AlunoController from "../controllers/aluno.controller.js";
const alunoController = new AlunoController();

import AlunoDisciplinaController from "../controllers/aluno_disciplina.controller.js";
const alunoDisciplinaController = new AlunoDisciplinaController();

import AvaliacaoController from "../controllers/avaliacao.controller.js";
const avaliacaoController = new AvaliacaoController();

import DisciplinaController from "../controllers/disciplina.controller.js";
const disicplinaController = new DisciplinaController();

import FolhaDeRespostasController from "../controllers/folha_de_respostas.controller.js";
const folhaDeRespostasController = new FolhaDeRespostasController();

import GabaritoOficialController from "../controllers/gabarito_oficial.controller.js";
const gabaritoOficialController = new GabaritoOficialController();

// Endpoints com Alunos:
routes.get('/aluno', alunoController.list());
routes.get('/aluno/:ra', alunoController.getAlunoByRA());
routes.post('/aluno', alunoController.register());
routes.patch('/aluno/:ra', alunoController.update());
routes.delete('/aluno/:ra', alunoController.delete());

// Endpoints com Alunos + Disciplinas:
routes.get('/aluno_disciplina/:ra', alunoDisciplinaController.listDisciplinasMatriculadas());
routes.get('/aluno_disciplina/:ra', alunoDisciplinaController.listDisciplinasNaoMatriculadas());
routes.post('/aluno_disciplina', alunoDisciplinaController.register());
routes.delete('/aluno_disciplina/:ra', alunoDisciplinaController.delete());

// Endpoints com Avaliações:
routes.get('/avaliacao', avaliacaoController.list());
routes.post('/avaliacao', avaliacaoController.register());
routes.patch('/avaliacao/:codigo_avaliacao', avaliacaoController.update());
routes.delete('/avaliacao/:codigo_avaliacao', avaliacaoController.delete());

// Endpoints com Disciplinas:
routes.get('/disciplina', disicplinaController.list());
routes.post('/disciplina', disicplinaController.register());
routes.patch('/disciplina/:codigo_disciplina', disicplinaController.update());
routes.delete('/disciplina/:codigo_disciplina', disicplinaController.delete());

// Endpoints com Folhas de Respostas:
routes.post('/folha_de_respostas', folhaDeRespostasController.register());

// Endpoints com Gabaritos Oficiais:
routes.get('/gabarito_oficial', gabaritoOficialController.list());
routes.post('/gabarito_oficial', gabaritoOficialController.register());
routes.patch('/gabarito_oficial/:codigo_gabarito', gabaritoOficialController.update());
routes.delete('/gabarito_oficial/:codigo_gabarito', gabaritoOficialController.delete());

export default routes;