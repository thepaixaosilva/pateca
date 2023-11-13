import { GetPostGabaritoOficial, GetDeletePutGabaritoOficialById } from "./gabaritosOficiais.js";
import { GetPostAluno, GetDeletePutAlunoById} from "./aluno.js"

export default {
    '/gabaritoOficiais': GetPostGabaritoOficial,
    '/gabaritoOficiais/{id}': GetDeletePutGabaritoOficialById,
    '/alunos': GetPostAluno,
    '/alunos/{id}': GetDeletePutAlunoById
}