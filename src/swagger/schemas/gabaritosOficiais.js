export const GabaritoOficial = {
    type: "object",
    required: ["id","respostaProva", "codDisciplina", "dataProva"],
    properties: {
        id: {
            type: "number",
            description: "ID do gabarito oficial",
        },
        respostaProva: {
            type: "array",
            description: "Respostas da prova",
        },
        codDisciplina: {
            type: "number",
            description: "Código da disciplina",
        },
        dataProva: {
            type: "string",
            description: "Data da Prova",
        },
    },
    example: {
        id: 1,
        respostaProva: [ "a", "b","c","d","e"],
        codDisciplina: 1,
        dataProva: "12/11/2023",
    },
}