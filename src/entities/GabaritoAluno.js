// Entidade Nota (será alterado).
export default class GabaritoAluno {
    constructor (id, codAluno, codDisciplina, codGabaritoOficial, respostaAluno, nota) {
        this.id = id
        this.codAluno = codAluno
        this.codDisciplina = codDisciplina
        this.codGabaritoOficial = codGabaritoOficial
        this.respostaAluno = respostaAluno // [resp1, resp2, resp3, resp4, resp5]
        this.nota = nota
    }
}