import BaseModel from "./BaseModel.js"

export default class DisciplianaModel extends BaseModel {
    constructor(db) {
        super(db, 'disciplinas')
    }

    // Adicionar um método para realizar a pesquisa de alunos por nome - funcionalidade a ser debatida.
}