// Entidade gabarito
export default class Gabarito {
    constructor (codGabarito, resp1, codMateria, dataProva){
        this.codGabarito = codGabarito
        this.resp1 = resp1
        this.codMateria = codMateria
        //this.respostaProva = [resp1, resp2, resp3, resp4, resp5] // Será um array com as respotas de cada aluno em cada prova.
        this.dataProva = dataProva
    }
}