import BaseModel from "./BaseModel.js"

export default class AlunoModel extends BaseModel {
    constructor(db) {
        super(db, 'alunos')
    }

    /*
    OBSERVAÇÃO:

    As linhas abaixo foram criadas devido à não-unifomidade
    entre as chaves primárias das entidades ('ra' para a en-
    tidade 'Aluno', 'codGabarito' para a entidade 'Gabarito'
    etc.). Sugiro que, apenas por essa semana, todos os mo-
    delos sigam esse formato, provisoriamente. Depois estu-
    daremos a possibilidade de uniformizar as chaves primá-
    rias, assim visando utilizar apenas o 'BaseModel'.
    */

    findAluno(alunoRA) {
        return this.db.find((item) => item.ra == alunoRA)
    }

    updateAluno(ra, item){
        const index = this.db.findIndex((item) => item.ra == ra)
        if(index === -1) throw Error('O registro informado não existe')
        this.db[index] = item
        return true
    }

    deleteAluno(ra){
        const index = this.db.findIndex((item) => item.ra == ra)
        if(index === -1) throw Error('O registro informado não existe')
        this.db.splice(index,1)
        return true 
    }
}