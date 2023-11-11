import { Router } from "express"
import DisciplinaModel from "../models/DisciplinaModel.js"

export default class DisciplinaRoutes {
  constructor(db) {
    this.db = new DisciplinaModel(db)
  }

  routes() {
    const router = Router()

    // Obtém todos os registros.
    router.get('/', (req, res) => {
      const disciplinas = this.db.findAll()
      res.json(disciplinas)
    })

    // Obtém apenas o registro especificado na requisição.
    router.get('/:id', (req, res) => {
      const {id} = req.params

      if (!id || id == "") return res.status(400).json({ message: 'O campo "ID" é obrigatório.' })

      const disciplina = this.db.findById(id)
      if(!disciplina) return res.status(404).json({erro: "Disciplina não encontrado"})
      
      res.status(200).json(disciplina)
    })

    // Cria um novo registro.
    router.post('/', (req, res) => {
      const novaDisciplina = req.body
      
      if(!novaDisciplina.id) return res.status(400).json({ message: 'O campo "Id" é obrigatório' })
      if(!novaDisciplina.nome) return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!novaDisciplina.semestre) return res.status(400).json({ message: 'O semestre é obrigatório' })

      this.db.create(novaDisciplina)
      res.status(201).json(novaDisciplina)
    })

    // Altera um registro existente.
    router.patch('/:id', (req, res) => {
      const { id } = req.params
      const disciplina = req.body

      if(!disciplina.id || disciplina.id == "") return res.status(400).json({ message: 'O campo "Id" é obrigatório' })
      if(!disciplina.nome || disciplina.nome == "") return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!disciplina.semestre || disciplina.semestre == "") return res.status(400).json({ message: 'O semestre é obrigatório' })

      this.db.update(id, disciplina)
      res.json(disciplina)
    })

    // Exclui um registro da base de dados.
    router.delete('/:id', (req, res) => {
      const { id } = req.params
      this.db.delete(id)
      res.json({ message: 'Disciplina removida com sucesso.' })
    })
    
    return router
  }
}
