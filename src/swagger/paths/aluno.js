export const GetPostAluno = {
    get: {
        description: "Retorna a lista de Alunos",
        tags: ["Aluno"],
        responses: {
            200: {
                description: "Lista de alunos",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/schemas/Aluno"
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
        description: "Cria um novo aluno",
        tags: ["Aluno"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/Aluno" 
                    },
                },
            },
        },
        responses: {
            200: {
                description: "O aluno foi criado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Aluno"
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

export const GetDeletePutAlunoById = {
    get: {
        description: "Retorna o Aluno pelo ID",
        tags: ["Aluno"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID do aluno",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "aluno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Aluno"
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
        description: "Deleta o aluno pelo ID",
        tags: ["Aluno"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID do aluno",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "aluno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Aluno"
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
        description: "Atauliza um aluno",
        tags: ["Aluno"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/Aluno" 
                    },
                },
            },
        },
        parameters: [
            {
                name: "id",
                in: "path",
                description: "ID do aluno",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "aluno",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/Aluno"
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