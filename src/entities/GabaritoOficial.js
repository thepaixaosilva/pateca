// Entidade gabarito
export default class GabaritoOficial {
    constructor (id, resp1, codDisciplina, dataProva){
        this.id = id
        this.resp1 = resp1
        this.codDisciplina = codDisciplina
        //this.respostaProva = [resp1, resp2, resp3, resp4, resp5] // Será um array com as respotas de cada aluno em cada prova.
        this.dataProva = dataProva
    }
}
