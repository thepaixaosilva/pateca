//entidade gabarito

export default class Gabarito{
    constructor(codGabarito,codMateria, [resp1,resp2,resp3,resp4,resp5], dataProva){
        this.codGabarito = codGabarito
        this.codMateria = codMateria
        this.respostaProva = [resp1,resp2,resp3,resp4,resp5] //vai ser um array com as respotas de cada aluno em cada prova
        this.dataProva = dataProva
    }
}