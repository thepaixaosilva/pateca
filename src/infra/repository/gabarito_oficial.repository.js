import trataErro from "./../../utils/errorHandler.js";
import db from "../database/database.js";
import dotenv from "dotenv";
dotenv.config();

export default class GabaritoOficialRepository {
    constructor() {
        this.db = db;
    }

    register(data) {
        return new Promise(async (resolve, reject) => {
            this.db.query(
                `INSERT INTO GABARITO_OFICIAL VALUES (?, ?, ?, ?, ?, ?, ?);`,
                [
                    data.questao_1,
                    data.questao_2,
                    data.questao_3,
                    data.questao_4,
                    data.questao_5,
                    data.codigo_disciplina,
                    data.codigo_avaliacao,
                ],
                async (error, response) => {
                    if (error) return resolve(trataErro(error));
                    return resolve({
                        success: "Gabarito cadastrado com sucesso!",
                        id: response.insertId,
                    });
                }
            );
        });
    }

    update(codigo_gabarito, data) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `UPDATE GABARITO_OFICIAL SET questao_1 = ?, questao_2 = ?, questao_3 = ?, questao_4 = ?, questao_5 = ?, codigo_disciplina = ?, codigo_avaliacao = ?"
				WHERE codigo_gabarito = ?;`,
                    [
                        data.questao_1,
                        data.questao_2,
                        data.questao_3,
                        data.questao_4,
                        data.questao_5,
                        data.codigo_disciplina,
                        data.codigo_avaliacao,
                        codigo_gabarito,
                    ],
                    async (error, response) => {
                        return resolve({
                            success: `Gabarito atualizado com sucesso!`,
                        });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    list() {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `SELECT * FROM GABARITO_OFICIAL;`,
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        return resolve({ gabaritos: response, code: 200 });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    delete(codigo_gabarito) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `DELETE FROM GABARITO_OFICIAL WHERE codigo_gabarito = ?;`,
                    [codigo_gabarito],
                    async (error, response) => {
                        if (error) {
                            return resolve({
                                error: `Exclusão mal-sucedida.`,
                                code: 400,
                            });
                        }
                        return resolve({
                            success: `Gabarito excluído com sucesso!`,
                        });
                    }
                );
            } catch (error) {}
        });
    }
}
