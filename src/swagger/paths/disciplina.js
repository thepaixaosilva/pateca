export const GetPostDisciplina = {
    get: {
        description: "Retorna a lista de Discilpinas",
        tags: ["Disciplinas"],
        responses: {
            200: {
                description: "Lista de disciplinas",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/schemas/Disciplinas"
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
        description: "Cria uma nova disciplina",
        tags: ["Disciplina"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/Disciplina" 
                    },
                },
            },
        },
        responses: {
            200: {
                description: "A Disciplina foi criado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Disciplina"
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

export const GetDeletePutDisciplinaById = {
    get: {
        description: "Retorna a Disciplina pelo ID",
        tags: ["Disciplina"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID da disciplina",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "disciplina",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Disciplina"
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
        description: "Deleta a disciplina pelo ID",
        tags: ["Disciplina"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID da Disciplina",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "disciplina",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Disciplina"
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
        description: "Atualiza uma disciplina",
        tags: ["Disciplina"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/Disciplina" 
                    },
                },
            },
        },
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID da Disciplina",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "disciplina",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Disciplina"
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