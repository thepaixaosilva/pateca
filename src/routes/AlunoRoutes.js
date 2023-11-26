import { Router } from "express"
import AlunoModel from "../models/AlunoModel.js"

export default class AlunoRoutes {
  constructor(db) {
    this.db = new AlunoModel(db)
  }

  routes() {
    const router = Router()

    // Obtém todos os registros.
    router.get('/', (req, res) => {
      const alunos = this.db.findAll()
      res.json(alunos)
    })

    // Obtém apenas o registro especificado na requisição.
    router.get('/:id', (req, res) => {
      const {id} = req.params

      if (!id || id == "") return res.status(400).json({ message: 'O campo "RA" é obrigatório.' })

      const aluno = this.db.findById(id)
      if(!aluno) return res.status(404).json({erro: "Aluno não encontrado"})
      
      res.status(200).json(aluno)
    })

    // Obtém o resgistro com o nome enviado pelo parâmetro.
    router.get('/nome/:name', (req, res) => {
      const aluno = this.db.findByName(req.params.name)
      if(!aluno) return res.status(404).json({erro: "Nome não encontrado"})
      else res.status(200).json(aluno)
    })

    // Cria um novo registro.
    router.post('/', (req, res) => {
      const novoAluno = req.body
      
      if(!novoAluno.id || novoAluno.id == "") return res.status(400).json({ message: 'O campo "RA" é obrigatório' })
      if(!novoAluno.nome || novoAluno.nome == "") return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!novoAluno.senha || novoAluno.senha == "") return res.status(400).json({ message: 'A senha é obrigatória' })

      this.db.create(novoAluno)
      res.status(201).json(novoAluno)
    })

    // Altera um registro existente.
    router.put('/:id', (req, res) => {
      const { id } = req.params
      const aluno = req.body

      if(!aluno.id || aluno.id == "") return res.status(400).json({ message: 'O campo "RA" é obrigatório' })
      if(!aluno.nome || aluno.nome == "") return res.status(400).json({ message: 'O campo "nome" é obrigatório' })
      if(!aluno.senha || aluno.senha == "") return res.status(400).json({ message: 'A senha é obrigatória' })

      this.db.update(id, aluno)
      res.json(aluno)
    })

    // Exclui um registro da base de dados.
    router.delete('/:id', (req, res) => {
      const { id } = req.params
      if(!id || id == "") return res.status(400).json({erro: 'Campo "RA" obrigatório'})
      const excluir = this.db.delete(Number(id))
      if(!excluir) return res.status(404).json({erro: "Erro ao excluir."})
      res.json({ message: 'Aluno(a) removido(a) com sucesso.' })
    })
    
    return router
  }
}
