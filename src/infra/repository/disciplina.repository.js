import trataErro from "./../../utils/errorHandler.js";
import db from "../database/database.js";
import dotenv from "dotenv";
dotenv.config();

export default class DisciplinaRepository {
    constructor() {
        this.db = db;
    }

    register(data) {
        return new Promise(async (resolve, reject) => {
            this.db.query(
                `INSERT INTO DISCIPLINA VALUES (?, ?, ?);`,
                [
                    data.nome_disciplina,
                    data.semestre_disciplina,
                    data.codigo_disciplina,
                ],
                async (error, response) => {
                    if (error) return resolve(trataErro(error));
                    return resolve({
                        success: "Disciplina cadastrada com sucesso!",
                        id: response.insertId,
                    });
                }
            );
        });
    }

    update(codigo_disciplina, data) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `UPDATE DISCIPLINA SET nome_disciplina = ?, semestre_disciplina = ? WHERE codigo_disciplina = ?;`,
                    [
                        data.nome_disciplina,
                        data.semestre_disciplina,
                        codigo_disciplina,
                    ],
                    async (error, response) => {
                        return resolve({
                            success: `Disciplina atualizada com sucesso!`,
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
                    `SELECT * FROM DISCIPLINA;`,
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        return resolve({ disciplinas: response, code: 200 });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    delete(codigo_disciplina) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `DELETE FROM DISCIPLINA WHERE codigo_disciplina = ?;`,
                    [codigo_disciplina],
                    async (error, response) => {
                        if (error) {
                            return resolve({
                                error: `Exclusão mal-sucedida.`,
                                code: 400,
                            });
                        }
                        return resolve({
                            success: `Disciplina excluída com sucesso!`,
                        });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }
}
