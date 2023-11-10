//todos os modelos vão herdar as funcionalidades dessa base
export default class BaseModel {
    //recebe um banco de dados e uma entidade
    constructor (db, entity) {
        this.db = db[entity]
    }

    //retorna todos os dados cadastrados
    findAll() {
        return this.db
    }

    //adiciona um item
    create(item) {
        return this.db.push(item)
    }

    //procura item pelo ID
    findById(id) {
        return this.db.find((item) => item.id == id)
    }

    //deleta um item
    delete(id) {
        const index = this.db.findIndex((item) => item.id == id) //index é a posição do item no array, não é o ID
        if(index === -1) throw Error('O registro informado não existe') //validação
        this.db.splice(index,1) //deleta
        return true //foi deletado com sucesso
    }

    //altera um item
    update(id, item) {
        const index = this.db.findIndex((item) => item.id == id) //procura pelo ID e obtém o index/posição
        if(index === -1) throw Error('O registro informado não existe') //validação
        this.db[index] = item //atualiza
        return true //foi alterado com sucesso
    }
}