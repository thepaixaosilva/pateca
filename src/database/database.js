// Importa todas as entidades criadas
import Aluno from "../entities/Aluno.js"
import Disciplina from "../entities/Disciplina.js"
import GabaritoAluno from "../entities/GabaritoAluno.js"
import GabaritoOficial from "../entities/GabaritoOficial.js"

// Cria um banco de dados com as entidades
const db = {
    alunos: [
        new Aluno(1234567890123, "Fulano da Silva", "asdfasdfasdf"),
        new Aluno(9987654321098, "Cicrano Bastos", "qwerqwerqwerqwer")
    ],
    disciplinas: [
        new Disciplina("LPO-001", "Comunicação e Expressão", 1),
        new Disciplina("INF-164", "Informática Aplicada à Gestão", 1)
    ],
    gabaritoAlunos: [
        new GabaritoAluno(1, 1234567890123, "LPO-001", 1, ["a","b","c","d","e"], 10)
    ],
    gabaritoOficiais: [
        new GabaritoOficial(1, ["a","b","c","d","e"], "LPO-001", "10/10/2023")
    ]
}

export default db