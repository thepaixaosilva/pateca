export const Aluno = {
    type: "object",
    required: ["id","nome", "senha"],
    properties: {
        id: {
            type: "number",
            description: "ID do aluno",
        },
        nome: {
            type: "string",
            description: "Nome do aluno",
        },
        senha: {
            type: "string",
            description: "Senha do aluno",
        }
    },
    example: {
        id: 1094334169,
        nome: "G. Kasparov",
        senha: "10221999"
    },
}