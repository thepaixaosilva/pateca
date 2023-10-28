import Aluno from "../entities/Aluno"
import Disciplina from "../entities/Disiciplina"
import Gabarito from "../entities/Gabarito"
import Nota from "../entities/Nota"

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
        new Gabarito(1, "LP003", ['a', 'd', 'd', 'b', 'e'], "12/05/2023")
    ],
    nota: [
        new Nota(1, "1234567890123", "LP003", 1, 10)
    ]
}

export default db