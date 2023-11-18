import { GetPostAluno, GetDeletePutAlunoById, GetAlunoByName} from "./aluno.js"
import { GetPostDisciplina, GetDeletePutDisciplinaById} from "./disciplina.js"
import { GetPostGabaritoAluno, GetDeletePutGabaritoAlunoById, GetGabaritoAlunoByAlunoId, GetGabaritoAlunoByDisciplinaId, GetGabaritoAlunoByGabaritoOficialId } from "./gabaritoAluno.js"
import { GetPostGabaritoOficial, GetDeletePutGabaritoOficialById } from "./gabaritosOficiais.js";

export default {
    '/alunos': GetPostAluno,
    '/alunos/{id}': GetDeletePutAlunoById,
    '/alunos/nome/{name}': GetAlunoByName,

    '/disciplinas': GetPostDisciplina,
    '/disciplinas/{id}': GetDeletePutDisciplinaById,

    '/gabaritoAlunos': GetPostGabaritoAluno,
    '/gabaritoAlunos/{id}': GetDeletePutGabaritoAlunoById,
    '/gabaritoAlunos/alunos/{id}': GetGabaritoAlunoByAlunoId,
    '/gabaritoAlunos/disciplinas/{id}': GetGabaritoAlunoByDisciplinaId,
    '/gabaritoAlunos/gabaritoOficiais/{id}': GetGabaritoAlunoByGabaritoOficialId,

    '/gabaritoOficiais': GetPostGabaritoOficial,
    '/gabaritoOficiais/{id}': GetDeletePutGabaritoOficialById,
}