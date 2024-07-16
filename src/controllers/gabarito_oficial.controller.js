import GabaritoOficialRepository from "../infra/repository/gabarito_oficial.repository.js";
const gabaritoOficial = new GabaritoOficialRepository();

export default class GabaritoOficialController {
    register() {
        return function (req, res) {
            const { data } = req.body;

            gabaritoOficial
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
            const { codigo_gabarito } = req.params;
            const { data } = req.body;

            gabaritoOficial
                .update(codigo_gabarito, data)
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
            gabaritoOficial
                .list()
                .then((response) => {
                    if (response.error) {
                        res.status(response.code).send({
                            error: response.error,
                        });
                    } else {
                        return res
                            .status(response.code)
                            .send(response.gabaritos);
                    }
                })
                .catch((error) => {
                    throw new Error(error);
                });
        };
    }

    delete() {
        return function (req, res) {
            const { codigo_gabarito } = req.params;

            gabaritoOficial
                .delete(codigo_gabarito)
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
