import trataErro from "./../../utils/errorHandler.js";
import db from "../database/database.js";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname + "/./../.env" });

export default class AlunoDisciplinaRepository {
    constructor() {
        this.db = db;
    }

    register(data) {
        return new Promise(async (resolve, reject) => {
            this.db.query(
                `INSERT INTO ALUNO_DISCIPLINA VALUES (?, ?);`,
                [data.codigo_disciplina, data.ra],
                async (error, response) => {
                    if (error) return resolve(trataErro(error));
                    return resolve({
                        success: "Aluno matriculado na disciplina com sucesso!",
                        id: response.insertId,
                    });
                }
            );
        });
    }

    delete(ra) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `DELETE FROM ALUNO_DISCIPLINA WHERE ra = ?;`,
                    [ra],
                    async (error, response) => {
                        if (error) {
                            return resolve({
                                error: `Exclusão mal-sucedida.`,
                                code: 400,
                            });
                        }
                        return resolve({
                            success: `Matrícula excluída com sucesso!`,
                        });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    listDisciplinasMatriculadas(ra) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `SELECT D.nome_disciplina FROM DISCIPLINA D
				    JOIN ALUNO_DISCIPLINA AD ON D.codigo_disciplina = AD.codigo_disciplina 
                    WHERE AD.ra = ?
                    ORDER BY D.nome_disciplina ASC;`,
                    [ra],
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        return resolve({ alunos: response, code: 200 });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }

    listDisciplinasNaoMatriculadas(ra) {
        return new Promise(async (resolve, reject) => {
            try {
                this.db.query(
                    `SELECT D.nome_disciplina FROM DISCIPLINA D
				    LEFT JOIN ALUNO_DISCIPLINA AD ON D.codigo_disciplina = AD.codigo_disciplina AND AD.ra = ?
				    WHERE AD.codigo_disciplina IS NULL
				    ORDER BY D.nome_disciplina ASC;`,
                    [ra],
                    async (error, response) => {
                        if (error) return reject(new Error(error));
                        return resolve({ alunos: response, code: 200 });
                    }
                );
            } catch (error) {
                trataErro(error);
            }
        });
    }
}
