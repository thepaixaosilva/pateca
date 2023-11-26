export const GetPostGabaritoOficial = {
    get: {
        description: "Retorna a lista de Gabaritos Oficiais",
        tags: ["GabaritosOficiais"],
        responses: {
            200: {
                description: "Lista de gabaritos",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/schemas/GabaritoOficial" //importação do schemas GabaritoOficial
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
        description: "Cria um novo gabarito oficial",
        tags: ["GabaritosOficiais"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/GabaritoOficial" 
                    },
                },
            },
        },
        responses: {
            200: {
                description: "O gabarito oficial criado",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoOficial" //importção do gabarito oficial
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

export const GetDeletePutGabaritoOficialById = {
    get: {
        description: "Retorna o gabarito pelo ID",
        tags: ["GabaritosOficiais"],
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
                description: "gabarito oficial",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoOficial"
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
        tags: ["GabaritosOficiais"],
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
                description: "gabarito oficial",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoOficial"
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
        description: "Atualiza um gabarito oficial",
        tags: ["GabaritosOficiais"],
        requestBody: {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/schemas/GabaritoOficial" 
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
                description: "gabarito oficial",
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/schemas/GabaritoOficial"
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