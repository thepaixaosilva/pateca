export const Disciplina = {
    type: "object",
    required: ["id","nome", "senha"],
    properties: {
        id: {
            type: "number",
            description: "ID da disciplina",
        },
        nome: {
            type: "string",
            description: "Nome da disciplina",
        },
        semestre: {
            type: "string",
            description: "Semestre referente a disciplina",
        }
    },
    example: {
        id: 10945645539,
        nome: "CALCULO 1",
        semestre: "2"
    },
}