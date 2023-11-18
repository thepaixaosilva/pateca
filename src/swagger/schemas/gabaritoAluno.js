export const GabaritoAluno = {
    type: "object",
    required: ["id", "codAluno", "codDisciplina", "codGabaritoOficial", "respostaAluno", "nota"],
    properties: {
        id: {
            type: "number",
            description: "ID do gabarito aluno",
        },
        codAluno: {
            type: "number",
            description: "identificador do aluno",
        },
        codDisciplina: {
            type: "string",
            description: "Código da disciplina",
        },
        codGabaritoOficial: {
            type: "number",
            description: "Codigo do gabarito oficial",
        },
        respostaAluno: {
            type: "array",
            description: "Respostas dadas pelo aluno",
        },
        nota: {
            type: "number",
            description: "Nota da Prova",
        },
    },
    example: {
        id: 5,
        codAluno: 97877889769,
        codDisciplina: "RP104",
        codGabaritoOficial: 5,
        respostaAluno: [ "a", "b","c","d","e"],
        nota: 6,
    },
}