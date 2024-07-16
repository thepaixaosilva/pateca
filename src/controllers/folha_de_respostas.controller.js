import FolhaDeRespostasRepository from "../infra/repository/folha_de_respostas.repository.js";
const folhaDeRespostas = new FolhaDeRespostasRepository();

export default class FolhaDeRespostasController {
    register() {
        return function (req, res) {
            const { data } = req.body;

            folhaDeRespostas
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
                        error: `Não foi possível salvar!`,
                    });
                });
        };
    }
}
