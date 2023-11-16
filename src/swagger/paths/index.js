import { GetPostGabaritoOficial, GetDeletePutGabaritoOficialById } from "./gabaritosOficiais.js";
import { GetPostAluno, GetDeletePutAlunoById} from "./aluno.js"
import { GetPostDisciplina, GetDeletePutDisciplinaById} from "./disciplina.js"

export default {
    '/gabaritoOficiais': GetPostGabaritoOficial,
    '/gabaritoOficiais/{id}': GetDeletePutGabaritoOficialById,
    '/alunos': GetPostAluno,
    '/alunos/{id}': GetDeletePutAlunoById,
    '/disciplinas': GetPostDisciplina,
    '/disciplianas/{id}': GetDeletePutDisciplinaById,
}