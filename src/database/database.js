//importa todas as entidades criadas
import Aluno from "../entities/Aluno.js"
import Disciplina from "../entities/Disiciplina.js"
import GabaritoOficial from "../entities/GabaritoOficial.js"
import GabaritoAluno from "../entities/GabaritoAluno.js"

//cria um banco de dados com as entidades
const db = {
    alunos: [
        new Aluno(1234567890123, "Fulano da Silva", "asdfasdfasdf"),
        new Aluno(9987654321098, "Cicrano Bastos", "qwerqwerqwerqwer")
    ],
    disciplinas: [
        new Disciplina("LP003", "Comunicação e Expressão", 2),
        new Disciplina("AG994", "Administração Geral", 1)
    ],
    gabaritoOficiais: [
        new GabaritoOficial(1, "a", 1, "10/10/2023")
    ],
    gabaritoAlunos: [
        new GabaritoAluno(1, "1234567890123", "LP003", 1, 10)
    ]
}

export default db
