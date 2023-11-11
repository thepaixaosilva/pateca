//rotas Gabarito
import {Router} from "express"
import GabaritoOficialModel from "../models/GabaritoOficialModel.js"

export default class GabaritoOficialRoutes {
  constructor(db){
    this.db = new GabaritoOficialModel(db)
  }

  routes(){
    const router = Router()

    router.get('/',(req,res) => {
      const gabaritoProvas = this.db.findAll()
      res.json(gabaritoProvas)
    })

    router.get('/:id', (req, res) => {
      const gabaritoProva = this.db.findById(req.params.id)
      if (!gabaritoProva) {
        res.status(404).json({ message: 'Gabarito da Prova não encontrado' })
      } else {
        res.json(gabaritoProva)
      }
    })

    router.post('/',(req,res)=>{
      const novoGabaritoProva = req.body

      if(!novoGabaritoProva.id) return res.status(400).json({ message: 'O código da prova é obrigatório' })
      if(!novoGabaritoProva.respostaProva) return res.status(400).json({ message: 'A resposta da prova é obrigatório' })
      if(!novoGabaritoProva.codDisciplina) return res.status(400).json({ message: 'O código da disciplina é obrigatório' })
      if(!novoGabaritoProva.dataProva) return res.status(400).json({ message: 'A data da prova é obrigatória' })

      this.db.create(novoGabaritoProva)
      res.json({ message: 'Gabarito da Prova criado com sucesso' })
    })

    router.put('/:id', (req, res) => {
      const { id } = req.params
      const gabaritoProva = req.body

      if(!gabaritoProva.id) return res.status(400).json({ message: 'O código da prova é obrigatório' })
      if(!gabaritoProva.respostaProva) return res.status(400).json({ message: 'A resposta da prova é obrigatório' })
      if(!gabaritoProva.codDisciplina) return res.status(400).json({ message: 'O código da disciplina é obrigatório' })
      if(!gabaritoProva.dataProva) return res.status(400).json({ message: 'A data da prova é obrigatória' })

      this.db.update(id, gabaritoProva)
      res.json({ message: 'Gabarito da Prova alterado com sucesso' })
    })

    router.delete('/:id', (req, res) => {
      const { id } = req.params
      this.db.delete(id)
      res.json({ message: 'Gabarito da Prova removido com sucesso' })
    })

    return router
  }
}