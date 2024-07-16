import trataErro from "./../../utils/errorHandler.js";
import db from "../database/database.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/./../../../.env" });

export default class AlunoRepository {
    constructor() {
        this.db = db;
    }

    async list() {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `SELECT * FROM ALUNO;`,
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        return resolve({ aluno: response[0], code: 200 });
                    }
                );
            } catch (error) {
                console.log(error)
                trataErro(error);
            }
        });
    }

    getAlunoByRA(ra) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `SELECT * FROM ALUNO WHERE ra = ?;`,
                    [ra],
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        return resolve({ aluno: response[0], code: 200 });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    register(data) {
        return new Promise(async (resolve, reject) => {
            this.db.query(
                `SET DATEFORMAT 'DMY'; INSERT INTO ALUNO VALUES (?, ?, ?, ?);`,
                [data.ra, data.cpf, data.nome_aluno, data.data_nascimento],
                async (error, response) => {
                    if (error) return resolve(trataErro(error));
                    return resolve({
                        success: "Aluno cadastrado com sucesso!",
                        id: response.insertId,
                    });
                }
            );
        });
    }

    update(ra, data) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `SET DATEFORMAT 'DMY'; UPDATE ALUNO SET cpf = ?, nome_aluno = ?, data_nascimento = ? WHERE ra = ?;`,
                    [data.cpf, data.nome_aluno, data.data_nascimento, ra],
                    async (error, response) => {
                        return resolve({
                            success: `Aluno atualizado com sucesso!`,
                        });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    delete(ra) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `DELETE FROM ALUNO WHERE ra = ?;`,
                    [ra],
                    async (error, response) => {
                        if (error) {
                            return resolve({
                                error: `Exclusão mal-sucedida.`,
                                code: 400,
                            });
                        }
                        return resolve({
                            success: `Aluno excluído com sucesso!`,
                        });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }
}
