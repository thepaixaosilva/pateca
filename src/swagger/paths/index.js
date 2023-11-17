import { GetPostGabaritoOficial, GetDeletePutGabaritoOficialById } from "./gabaritosOficiais.js";
import { GetPostAluno, GetDeletePutAlunoById, GetAlunoByName} from "./aluno.js"
import { GetPostDisciplina, GetDeletePutDisciplinaById} from "./disciplina.js"

export default {
    '/gabaritoOficiais': GetPostGabaritoOficial,
    '/gabaritoOficiais/{id}': GetDeletePutGabaritoOficialById,
    '/alunos': GetPostAluno,
    '/alunos/{id}': GetDeletePutAlunoById,
    '/alunos/nome/{name}': GetAlunoByName,
    '/disciplinas': GetPostDisciplina,
    '/disciplinas/{id}': GetDeletePutDisciplinaById,
}