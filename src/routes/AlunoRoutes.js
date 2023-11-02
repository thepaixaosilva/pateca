import { Router } from "express"
import AlunoModel from "../models/AlunoModel.js"

export default class AlunoRoutes {
  constructor(db) {
    this.db = new AlunoModel(db)
  }

  routes() {
    const router = Router()

    router.get('/', (req, res) => {
      const alunos = this.db.findAll()
      res.json(alunos)
    })

    /*
    router.get('/:id', (req, res) => {
      const aluno = this.db.findById(req.params.id)
      if (!aluno) {
        res.status(404).json({ message: 'Aluno(a) não encontrado(a)' })
      } else {
        res.json(aluno)
      }
    })
    */

    router.post('/', (req, res) => {
      const novoAluno = req.body
      
      if(!novoAluno.ra) return res.status(400).json({ message: 'O campo "RA" é obrigatório' })
      if(!novoAluno.nome) return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!novoAluno.senha) return res.status(400).json({ message: 'A senha é obrigatória' })

      this.db.create(novoAluno)
      res.json(novoAluno)
    })

    /*
    router.put('/:id', (req, res) => {
      const { id } = req.params
      const aluno = req.body

      if(!aluno.id) return res.status(400).json({ message: 'O campo "RA" é obrigatório' })
      if(!aluno.nome) return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!aluno.senha) return res.status(400).json({ message: 'A senha é obrigatória' })

      this.db.update(id, aluno)
      res.json(aluno)
    })
    */

    router.delete('/:ra', (req, res) => {
      const { ra } = req.params
      this.db.delete(ra)
      res.json({ message: 'Aluno(a) removido(a) com sucesso' })
    })
    
    return router
  }
}
