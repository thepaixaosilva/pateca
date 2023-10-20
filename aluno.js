export default class Aluno {
    constructor (ra, nome, senha) {
        this.ra = ra
        this.nome = nome
        this.senha = senha
    }

    verificarCoordenador(ra, senha) { // método para verificar se o login é do coordenador
        const minhaPromise = new Promise((resolve,reject) => {
            if (ra == 123456789 && senha == "coordenador") {
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
    }
}