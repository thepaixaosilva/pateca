// Entidade Aluno.
export default class Aluno {
    constructor (id, nome, senha) {
        this.id = id
        this.nome = nome
        this.senha = senha
    }

    // Método para verificar se o login é do coordenador.
    /*async verificarCoordenador(id, senha) { 
        const minhaPromise = new Promise((resolve,reject) => {
            if (id == 123456789 && senha == "coordenador") {
                resolve(`É coordenador`)
            } else {
                reject(`Não é coordenador`)
            }
        })

        return minhaPromise.then(
            (resultado) => console.log(resultado)
        ).catch(
            (resultado) => console.log(resultado)
        )
    }*/
}
