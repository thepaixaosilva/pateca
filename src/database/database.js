//importa todas as entidades criadas
import Aluno from "../entities/Aluno.js"
import Disciplina from "../entities/Disiciplina.js"
import Gabarito from "../entities/Gabarito.js"
import Nota from "../entities/Nota.js"

//cria um banco de dados com as entidades
const database = {
    gabaritos: [
        new Gabarito(1,1,["a","a","a","a","a"],"21/10/2023")
    ]
}

export default database