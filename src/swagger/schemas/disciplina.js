export const Disciplina = {
    type: "object",
    required: ["id","nome", "semestre"],
    properties: {
        id: {
            type: "string",
            description: "ID da disciplina",
        },
        nome: {
            type: "string",
            description: "Nome da disciplina",
        },
        semestre: {
            type: "number",
            description: "Semestre referente a disciplina",
        }
    },
    example: {    
        id: "HST-001",
        nome: "Sociedade, Tecnologia e Informação",
        semestre: 1
    },
}