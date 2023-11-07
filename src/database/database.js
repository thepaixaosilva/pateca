//importa todas as entidades criadas
import Aluno from "../entities/Aluno.js"
import Disciplina from "../entities/Disiciplina.js"
import Gabarito from "../entities/Gabarito.js"
import Nota from "../entities/Nota.js"

//cria um banco de dados com as entidades
const db = {
    alunos: [
        new Aluno("1234567890123", "Fulano da Silva", "asdfasdfasdf"),
        new Aluno("0987654321098", "Cicrano Bastos", "qwerqwerqwerqwer")
    ],
    disciplinas: [
        new Disciplina("LP003", "Comunicação e Expressão", 2),
        new Disciplina("AG994", "Administração Geral", 1)
    ],
    gabarito: [
        new Gabarito(1, 1, "a", "a", "a", "a", "a", "21/10/2023")
    ],
    nota: [
        new Nota(1, "1234567890123", "LP003", 1, 10)
    ]
}

export default db
