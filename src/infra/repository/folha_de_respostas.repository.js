import trataErro from "./../../utils/errorHandler.js";
import db from "../database/database.js";
import dotenv from "dotenv";
dotenv.config();

export default class FolhaDeRespostasRepository {
    constructor() {
        this.db = db;
    }

    register() {
        return new Promise(async (resolve, reject) => {
            this.db.query(
                `INSERT INTO FOLHA_DE_RESPOSTAS VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
                [data.resposta_1, data.resposta_2, data.resposta_3, data.resposta_4, data.resposta_5, data.nota, data.codigo_gabarito, data.ra],
                async (error, response) => {
                    if (error) return resolve(trataErro(error));
                    return resolve({
                        success: "Folha de respostas salva com sucesso!",
                        id: response.insertId,
                    });
                }
            );
        });
    }
}
