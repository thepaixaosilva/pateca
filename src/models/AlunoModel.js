import BaseModel from "./BaseModel.js"

export default class AlunoModel extends BaseModel {
    constructor(db) {
        super(db, 'alunos')
    }

    // Adicionar um método para realizar a pesquisa de alunos por nome - funcionalidade a ser debatida.
}