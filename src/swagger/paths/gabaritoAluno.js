export const GetPostGabaritoAluno = {
    get: {
        description: "Retorna a lista de Gabaritos Aluno",
        tags: ["GabaritosAluno"],
        responses: {
            200: {
                description: "Lista de gabaritos",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/schemas/GabaritoAluno"
                            }
                        },
                    },
                },
            },
            500: {
                description: "Erro interno",
            },
        },
    },
    post: {
        description: "Cria um novo gabarito aluno",
        tags: ["GabaritosAlunos"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/GabaritoAluno" 
                    },
                },
            },
        },
        responses: {
            200: {
                description: "Gabarito aluno criado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoAluno"
                        },
                    },
                },
            },
            500: {
                description: "Erro interno",
            },
        },
    },
}

export const GetDeletePutGabaritoAlunoById = {
    get: {
        description: "Retorna o gabarito pelo ID",
        tags: ["GabaritosAluno"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID do gabarito",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "gabarito aluno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoAluno"
                        }
                    },
                },
            },
            500: {
                description: "Erro interno",
            },
        },
    },
    delete: {
        description: "Deleta o gabarito pelo ID",
        tags: ["GabaritosAlunos"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID do gabarito",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "gabarito aluno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoAluno"
                        }
                    },
                },
            },
            500: {
                description: "Erro interno",
            },
        },
    },
    put: {
        description: "Atauliza um gabarito aluno",
        tags: ["GabaritosAlunos"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/GabaritoAluno" 
                    },
                },
            },
        },
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID do gabarito",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "gabarito aluno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoAluno"
                        }
                    },
                },
            },
            500: {
                description: "Erro interno",
            },
        },
    },
}