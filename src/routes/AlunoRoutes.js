// Rotas Aluno (precisa de mudanças/melhorias).

import { Router } from "express"
import Aluno from '../entities/Aluno.js'
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

    router.get('/:ra', (req, res) => {
      const {ra} = req.params

      if (!ra || ra == "") return res.status(400).json({ message: 'O campo "RA" é obrigatório.' })

      const aluno = this.db.findAluno(ra)
      if(!aluno) return res.status(404).json({erro: "Aluno não encontrado"})
      
      res.status(200).json(aluno)
    })

    router.post('/', (req, res) => {
      const novoAluno = req.body
      
      if(!novoAluno.ra) return res.status(400).json({ message: 'O campo "RA" é obrigatório' })
      if(!novoAluno.nome) return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!novoAluno.senha) return res.status(400).json({ message: 'A senha é obrigatória' })

      this.db.create(novoAluno)
      res.status(201).json(novoAluno)
    })

    // Alterei o 'put' para 'patch', mas (provavelmente) o 'put' funcionaria da mesma forma que o 'patch' (nesse caso).
    router.patch('/:ra', (req, res) => {
      const { ra } = req.params
      const aluno = req.body

      if(!aluno.ra || aluno.ra == "") return res.status(400).json({ message: 'O campo "RA" é obrigatório' })
      if(!aluno.nome || aluno.nome == "") return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!aluno.senha || aluno.senha == "") return res.status(400).json({ message: 'A senha é obrigatória' })

      this.db.updateAluno(ra, aluno)
      res.json(aluno)
    })

    router.delete('/:ra', (req, res) => {
      const { ra } = req.params
      if(!ra || ra == "") return res.status(400).json({erro: 'Campo "RA" obrigatório'})
      const excluir = this.db.deleteAluno(Number(ra))
      if(!excluir) return res.status(404).json({erro: "Erro ao excluir."})
      res.json({ message: 'Aluno(a) removido(a) com sucesso.' })
    })
    
    return router
  }
}
