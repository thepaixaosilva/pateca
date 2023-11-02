//rotas Gabarito

import {Router} from 'express'
import Gabarito from '../entities/Gabarito.js'
import GabaritoModel from '../models/GabaritoModel.js'

export default class GabaritoRoutes {
    //db recebe os dados salvos na parte de Gabarito
    constructor(db){
        this.db = new GabaritoModel(db)
    }

    routes(){
        const router = Router() //função para criar rotas

        //rota FindAll
        router.get('/',(req,res) => {
            const gabaritos = this.db.findAll() //chama o método findAll criada na BaseModel
            res.json(gabaritos) //transforma os dados em um json
        })

        //rota Create
        router.post('/',(req,res) => {
            const {codGabarito, codMateria, respostas, dataProva} = req.body //extrai os dados que foram colocados no corpo da requisição

            //validação:
            if(!codGabarito || codGabarito == "") return res.status(400).json({erro: 'Código gabarito obrigatório'})
            if(!codMateria || codMateria == "") return res.status(400).json({erro: 'Código matéria obrigatório'})
            if(!respostas || respostas == "") return res.status(400).json({erro: 'Respotas obrigatórias'})
            if(!dataProva || dataProva == "") return res.status(400).json({erro: 'Data da Prova obrigatória'})

            const gabarito = new Gabarito(codGabarito, codMateria, respostas, dataProva) //cria um novo gabarito
            this.db.create(gabarito)//usando o método criado na BaseModel adiciona esse novo gabarito ao banco de dados
            res.status(201).json(tarefa)
        })

        //rota FindById
        router.get('/:codGabarito',(req,res) => { //codGbarito é um parametro
            const {codGabarito} = req.params //extrai o codigo que foi colocado como parametro

            //validação:
            if(!codGabarito || codGabarito == "") return res.status(400).json({erro: 'Código gabarito obrigatório'})

            const gabarito = this.db.findById(Number(codGabarito)) //chama o método findById e tranforma o codigo inserido em um numero
            if(!gabarito) return res.status(404).json({erro: "Gabarito não encontrada"}) //mensagem de erro caso não ache um gabarito

            res.json(gabarito)
        })

        //rota Delete
        router.delete('/:codGabarito',(req,res) => {
            const {codGabarito} = req.params //extrai o codigo que foi colocado como parametro
            
            //validação:
            if(!codGabarito || codGabarito == "") return res.status(400).json({erro: 'Código gabarito obrigatório'})

            const deletar = this.db.delete(Number(codGabarito)) //chama o método Delete
            if(!deletar) return res.status(404).json({erro: "Erro ao deletar"}) //mensagem de erro

            res.json({ mensagem: 'Gabarito removido com sucesso' })
        })

        //rota Update
        router.put('/:cod',(req,res) => {
            const {cod} = req.params //extrai o codigo que foi colocado como parametro
            const {codGabarito, codMateria, respostas, dataProva} = req.body //extrai os dados que foram colocados no corpo da requisição

            //validação:
            if(!codGabarito || codGabarito == "") return res.status(400).json({erro: 'Código gabarito obrigatório'})
            if(!codMateria || codMateria == "") return res.status(400).json({erro: 'Código matéria obrigatório'})
            if(!respostas || respostas == "") return res.status(400).json({erro: 'Respotas obrigatórias'})
            if(!dataProva || dataProva == "") return res.status(400).json({erro: 'Data da Prova obrigatória'})

            const gabarito = new Gabarito(codGabarito, codMateria, respostas, dataProva) //cria um novo gabarito atualizando os dados
            this.db.update(cod,gabarito) //atualiza gabarito

            res.json(gabarito)
        })
        return router
    }
}