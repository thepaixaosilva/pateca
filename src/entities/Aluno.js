export default class Aluno {
    constructor (ra, nome, senha) {
        this.ra = ra
        this.nome = nome
        this.senha = senha
    }

    // Método para verificar se o login é do coordenador.
    async verificarCoordenador(ra, senha) { 
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
