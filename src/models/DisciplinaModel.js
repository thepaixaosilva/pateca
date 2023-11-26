import BaseModel from "./BaseModel.js"

export default class DisciplinaModel extends BaseModel {
    constructor(db) {
        super(db, 'disciplinas')
    }
}