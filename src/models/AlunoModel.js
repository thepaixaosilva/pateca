import BaseModel from "./BaseModel.js"

export default class AlunoModel extends BaseModel {
    constructor(db) {
        super(db, 'alunos')
    }

    /*
    todosAlunosPorRA(alunoRA) {
        return this.db[this.entity].filter(item => item.ra === alunoRA)
    }
    */
}