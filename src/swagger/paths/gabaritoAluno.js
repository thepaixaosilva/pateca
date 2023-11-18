export const GetPostGabaritoAluno = {
    get: {
        description: "Retorna a lista de Gabaritos Aluno",
        tags: ["GabaritoAlunos"],
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
        tags: ["GabaritoAlunos"],
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
        tags: ["GabaritoAlunos"],
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
        tags: ["GabaritoAlunos"],
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
        tags: ["GabaritoAlunos"],
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

export const GetGabaritoAlunoByAlunoId = {
    get: {
        description: "Retorna o Gabarito do Aluno pelo Id do Aluno",
        tags: ["GabaritoAlunos"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "Id do aluno",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "gabaritoAluno",
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

export const GetGabaritoAlunoByDisciplinaId = {
    get: {
        description: "Retorna o Gabarito do Aluno pelo Id da Disciplina",
        tags: ["GabaritoAlunos"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "Id da disciplina",
                required: true,
                schema: {
                    type: "string"
                },
            },
        ],
        responses: {
            200: {
                description: "gabaritoAluno",
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

export const GetGabaritoAlunoByGabaritoOficialId = {
    get: {
        description: "Retorna o Gabarito do Aluno pelo Id do Gabarito Oficial",
        tags: ["GabaritoAlunos"],
        parameters: [
            {
                name: "id",
                in: "path",
                description: "Id do gabarito oficial",
                required: true,
                schema: {
                    type: "number"
                },
            },
        ],
        responses: {
            200: {
                description: "gabaritoAluno",
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