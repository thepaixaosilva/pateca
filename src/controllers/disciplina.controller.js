import DisciplinaRepository from "../infra/repository/disciplina.repository.js";
const disciplina = new DisciplinaRepository();

export default class DisciplinaController {
    register() {
        return function (req, res) {
            const { data } = req.body;

            disciplina
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
            const { codigo_disciplina } = req.params;
            const { data } = req.body;

            disciplina
                .update(codigo_disciplina, data)
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
            disciplina
                .list()
                .then((response) => {
                    if (response.error) {
                        res.status(response.code).send({
                            error: response.error,
                        });
                    } else {
                        return res.status(response.code).send(response.disciplinas);
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };
    }

    delete() {
        return function (req, res) {
            const { codigo_disciplina } = req.params;

            disciplina
                .delete(codigo_disciplina)
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
