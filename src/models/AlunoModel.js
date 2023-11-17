import BaseModel from "./BaseModel.js"

export default class AlunoModel extends BaseModel {
    constructor(db) {
        super(db, 'alunos')
    }

    findByName(nome) {
        return this.db.find((item) => item.nome == nome)
    }
}