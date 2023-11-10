import BaseModel from "./BaseModel.js"

export default class GabaritoAlunoModel extends BaseModel {
    constructor(db) {
        super(db, 'gabaritoAlunos')
    }

    findAllByCodAluno(codAluno) {
        return this.db.filter(item => item.codAluno === codAluno)
    }

    findAllByCodDisciplina(codDisciplina) {
        return this.db.filter(item => item.codDisciplina === codDisciplina)
    }

    findAllByCodGabaritoOficial(codGabaritoOficial) {
        return this.db.filter(item => item.codGabaritoOficial === codGabaritoOficial)
    }
}