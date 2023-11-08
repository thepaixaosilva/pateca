import BaseModel from "./BaseModel.js"

export default class GabaritoModel extends BaseModel{
    constructor(db){
        super(db,'gabaritos')
    }
}