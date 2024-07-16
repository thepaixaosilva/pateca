import AlunoDisciplinaRepository from "../infra/repository/aluno_disciplina.repository.js";
const alunoDisciplina = new AlunoDisciplinaRepository();

export default class AlunoDisciplinaController {
    register() {
        return function (req, res) {
            const { data } = req.body;

            alunoDisciplina
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

    delete() {
        return function (req, res) {
            const { ra } = req.params;

            alunoDisciplina
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

    listDisciplinasMatriculadas() {
        return function (req, res) {
            const { ra } = req.params;

            alunoDisciplina
                .listDisciplinasMatriculadas(ra)
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

    listDisciplinasNaoMatriculadas() {
        return function (req, res) {
            const { ra } = req.params;

            alunoDisciplina
                .listDisciplinasNaoMatriculadas(ra)
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
}
