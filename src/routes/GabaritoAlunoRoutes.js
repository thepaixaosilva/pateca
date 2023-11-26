import { Router } from "express"
import GabaritoAlunoModel from "../models/GabaritoAlunoModel.js"

export default class GabaritoAlunoRoutes {
  constructor(db) {
    this.db = new GabaritoAlunoModel(db)
  }

  routes() {
    const router = Router()

    // Obtém todos os registros.
    router.get('/', (req, res) => {
      const gabaritoAlunos = this.db.findAll()
      res.json(gabaritoAlunos)
    })

    // Obtém apenas o registro especificado na requisição.
    router.get('/:id', (req, res) => {
      const gabaritoAluno = this.db.findById(req.params.id) 
      if (!gabaritoAluno) {
        res.status(404).json({ message: 'Gabarito do Aluno não encontrado' })
      } else {
        res.json(gabaritoAluno)
      }
    })
    
    // Rotas get especiais.

    // Obtém todos os registros de alunos especificados pelo id.
    router.get('/alunos/:id', (req, res) => {
      const gabaritoAluno = this.db.findAllByCodAluno(Number(req.params.id))
      if (gabaritoAluno == "") {
        res.status(404).json({ message: 'Aluno não encontrado' })
      } else {
        res.json(gabaritoAluno)
      }
    })

    // Obtém todos os registros de disciplinas especificadas pelo id.
    router.get('/disciplinas/:id', (req, res) => {
      const gabaritoAluno = this.db.findAllByCodDisciplina(req.params.id)
      if (gabaritoAluno == "") {
        res.status(404).json({ message: 'Disciplina não encontrada' })
      } else {
        res.json(gabaritoAluno)
      }
    })

    // Obtém todos os registros de gabaritos oficiais especificados pelo id.
    router.get('/gabaritoOficiais/:id', (req, res) => {
      const gabaritoAluno = this.db.findAllByCodGabaritoOficial(Number(req.params.id))
      if (gabaritoAluno == "") {
        res.status(404).json({ message: 'Gabarito Oficial não encontrado' })
      } else {
        res.json(gabaritoAluno)
      }
    })
    
    // Cria um novo registro.
    router.post('/', (req, res) => {
      const novoGabaritoAluno = req.body

      if(!novoGabaritoAluno.codAluno) return res.status(400).json({ message: 'O código do aluno é obrigatório' })
      if(!novoGabaritoAluno.codDisciplina) return res.status(400).json({ message: 'O código da disciplina é obrigatório' })
      if(!novoGabaritoAluno.codGabaritoOficial) return res.status(400).json({ message: 'O código do gabarito oficial é obrigatório' })
      if(!novoGabaritoAluno.respostaAluno) return res.status(400).json({ message: 'O campo resposta do aluno é obrigatório' })
      if(!novoGabaritoAluno.nota) return res.status(400).json({ message: 'O campo nota é obrigatório' })

      this.db.create(novoGabaritoAluno)
      res.json({ message: 'Gabarito do Aluno criado com sucesso' })
    })

    // Altera um registro existente.
    router.put('/:id', (req, res) => {
      const { id } = req.params 
      const gabaritoAluno = req.body

      if(!gabaritoAluno.codAluno) return res.status(400).json({ message: 'O código do aluno é obrigatório' })
      if(!gabaritoAluno.codDisciplina) return res.status(400).json({ message: 'O código da disciplina é obrigatório' })
      if(!gabaritoAluno.codGabaritoOficial) return res.status(400).json({ message: 'O código do gabarito oficial é obrigatório' })
      if(!gabaritoAluno.respostaAluno) return res.status(400).json({ message: 'O campo resposta do aluno é obrigatório' })
      if(!gabaritoAluno.nota) return res.status(400).json({ message: 'O campo nota é obrigatório' })

      this.db.update(id, gabaritoAluno)
      res.json({ message: 'Gabarito do Aluno alterado com sucesso' })
    })

    // Exclui um registro da base de dados.
    router.delete('/:id', (req, res) => {
      const { id } = req.params 
      this.db.delete(id)
      res.json({ message: 'Gabarito do Aluno removido com sucesso' })
    })

    return router
  }
}