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


        //rota FindById
        /*
        router.get('/:codGabaritoOficial',(req,res) => { //codGabaritoOficial é um parametro
            const {codGabaritoOficial} = req.params //extrai o codigo que foi colocado como parametro

            //validação:
            if(!codGabaritoOficial || codGabaritoOficial == "") return res.status(400).json({erro: 'Código gabarito obrigatório'})

            const gabarito = this.db.findById(Number(codGabaritoOficial)) //chama o método findById e tranforma o codigo inserido em um numero
            if(!gabarito) return res.status(404).json({erro: "Gabarito não encontrada"}) //mensagem de erro caso não ache um gabarito

            res.json(gabarito)
        })

        //rota Delete
        router.delete('/:codGabaritoOficial',(req,res) => {
            const {codGabaritoOficial} = req.params //extrai o codigo que foi colocado como parametro
            
            //validação:
            if(!codGabaritoOficial || codGabaritoOficial == "") return res.status(400).json({erro: 'Código gabarito obrigatório'})

            const deletar = this.db.delete(Number(codGabaritoOficial)) //chama o método Delete
            if(!deletar) return res.status(404).json({erro: "Erro ao deletar"}) //mensagem de erro

            res.json({ mensagem: 'Gabarito removido com sucesso' })
        })

        //rota Update
        router.put('/:cod',(req,res) => {
            const {cod} = req.params //extrai o codigo que foi colocado como parametro
            const {codGabaritoOficial, resp1, resp2, resp3, resp4 , resp5, codDisciplina, dataProva} = req.body //extrai os dados que foram colocados no corpo da requisição

            //validação:
            if(!codGabaritoOficial || codGabaritoOficial == "") return res.status(400).json({erro: 'Código gabarito obrigatório'})
            if(!codDisciplina || codDisciplina == "") return res.status(400).json({erro: 'Código matéria obrigatório'})
            if(!dataProva || dataProva == "") return res.status(400).json({erro: 'Data da Prova obrigatória'})

            const gabarito = new GabaritoOficial(codGabaritoOficial, resp1,resp2,resp3,resp4,resp5, codDisciplina, dataProva) //cria um novo gabarito atualizando os dados
            this.db.update(cod,gabarito) //atualiza gabarito

            res.json(gabarito)
        })*/
        return router
    }
}