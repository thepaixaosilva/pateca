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
            type: "string",
            description: "Código da disciplina",
        },
        dataProva: {
            type: "string",
            description: "Data da Prova",
        },
    },
    example: {
        id: 2,
        respostaProva: ["b","b","c","a","e"],
        codDisciplina: "INF-164",
        dataProva: "14/11/2023",
    },
}