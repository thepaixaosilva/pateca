import BaseModel from "./BaseModel.js"

//cria a classe Gabarito puxando as funcionalidade do BaseModel
export default class GabaritoModel extends BaseModel{
    constructor(db){
        super(db,'gabaritos') //informa um banco de dados e qual a entidade
    }
}