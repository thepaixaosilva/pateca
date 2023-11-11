import BaseModel from "./BaseModel.js"

export default class DisciplianaModel extends BaseModel {
    constructor(db) {
        super(db, 'disciplinas')
    }
}