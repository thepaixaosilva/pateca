// Entidade GabaritoOficial.
export default class GabaritoOficial {
    constructor (id, respostaProva, codDisciplina, dataProva){
        this.id = id
        this.respostaProva = respostaProva // Será um array com as respotas de cada aluno em cada prova
        this.codDisciplina = codDisciplina
        this.dataProva = dataProva
    }
}