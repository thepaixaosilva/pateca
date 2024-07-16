import Aluno from "../infra/repository/aluno.repository.js";
const aluno = new Aluno();

export default class AlunoController {
    list() {
        return function (req, res) {
            aluno
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

    getAlunoByRA() {
        return function (req, res) {
            const { ra } = req.params;

            aluno
                .getAlunoByRA(ra)
                .then((response) => {
                    if (response.error) {
                        res.status(response.code).send({
                            error: response.error,
                        });
                    } else return res.status(200).send(response);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };
    }

    register() {
        return function (req, res) {
            const { data } = req.body;

            aluno
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
            const { ra } = req.params;
            const { data } = req.body;

            aluno
                .update(ra, data)
                .then((response) => {
                    if (response.error) res.status(400).send(response);
                    else return res.status(200).send(response);
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };
    }

    delete() {
        return function (req, res) {
            const { ra } = req.params;

            aluno
                .delete(ra)
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
