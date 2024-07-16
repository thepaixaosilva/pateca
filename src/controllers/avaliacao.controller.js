import AvaliacaoRepository from "../infra/repository/avaliacao.repository.js";
const avaliacao = new AvaliacaoRepository();

export default class AvaliacaoController {
    register() {
        return function (req, res) {
            const { data } = req.body;

            avaliacao
                .register(data)
                .then((response) => {
                    if (response.error)
                        return res
                            .status(response.code)
                            .send({ error: response.error });
                    else return res.status(200).json(response);
                })
                .catch((error) => {
                    console.error(error);
                    return res.status(400).send({
                        error: `Não foi possível realizar o cadastro!`,
                    });
                });
        };
    }

    update() {
        return function (req, res) {
            const { codigo_avaliacao } = req.params;
            const { data } = req.body;

            avaliacao
                .update(codigo_avaliacao, data)
                .then((response) => {
                    if (response.error) res.status(400).send(response);
                    else return res.status(200).send(response);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };
    }

    list() {
        return function (req, res) {
            avaliacao
                .list()
                .then((response) => {
                    if (response.error) {
                        res.status(response.code).send({
                            error: response.error,
                        });
                    } else {
                        return res.status(response.code).send(response.alunos);
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };
    }

    delete() {
        return function (req, res) {
            const { codigo_avaliacao } = req.params;

            avaliacao
                .delete(codigo_avaliacao)
                .then((response) => {
                    if (response.error)
                        res.status(response.code).send(response);
                    else return res.status(200).send(response);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };
    }
}
