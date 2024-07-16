import trataErro from "./../../utils/errorHandler.js";
import db from "../database/database.js";
import dotenv from "dotenv";
dotenv.config();

export default class AvaliacaoRepository {
    constructor() {
        this.db = db;
    }

    register(data) {
        return new Promise(async (resolve, reject) => {
            this.db.query(
                `SET DATEFORMAT 'DMY'; INSERT INTO AVALIACAO VALUES (?, ?);`,
                [data.data_avaliacao, data.tipo_avaliacao],
                async (error, response) => {
                    if (error) return resolve(trataErro(error));
                    return resolve({
                        success: "Avaliação cadastrada com sucesso!",
                        id: response.insertId,
                    });
                }
            );
        });
    }

    update(codigo_avaliacao, data) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `SET DATEFORMAT 'DMY'; UPDATE AVALIACAO SET data_avaliacao = ?, tipo_avaliacao = ? WHERE codigo_avaliacao = ?;`,
                    [data.data_avaliacao, data.tipo_avaliacao, codigo_avaliacao],
                    async (error, response) => {
                        return resolve({
                            success: `Avaliação atualizada com sucesso!`,
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
                    `SELECT * FROM AVALIACAO;`,
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        return resolve({ avaliacoes: response, code: 200 });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    delete(codigo_avaliacao) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `DELETE FROM AVALIACAO WHERE codigo_avaliacao = ?;`,
                    [codigo_avaliacao],
                    async (error, response) => {
                        if (error) {
                            return resolve({
                                error: `Exclusão mal-sucedida.`,
                                code: 400,
                            });
                        }
                        return resolve({
                            success: `Avaliação excluída com sucesso!`,
                        });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }
}
