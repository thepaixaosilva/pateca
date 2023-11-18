import express from 'express'
import db from "./database/database.js"
import AlunoRoutes from "./routes/AlunoRoutes.js"
import DisciplinaRoutes from "./routes/DisciplinaRoutes.js"
import GabaritoAlunoRoutes from "./routes/GabaritoAlunoRoutes.js"
import GabaritoOficialRoutes from "./routes/GabaritoOficialRoutes.js"

import swaggerUi from "swagger-ui-express"
import swaggerDocument from './swagger/config.js'

const express = require('express')
const app = express()
app.use(express.json())

app.get('/healthcheck',(req,res)=>{
    res.send('Ok!')
})

// Acessa as rotas Aluno
const alunoRoutes = new AlunoRoutes(db)
app.use('/alunos', alunoRoutes.routes())

// Acessa as rotas Disicplina
const disciplinaRoutes = new DisciplinaRoutes(db)
app.use('/disciplinas', disciplinaRoutes.routes())

// Acessa as rotas GabaritoAluno
const gabaritoAlunoRoutes = new GabaritoAlunoRoutes(db)
app.use('/gabaritoAlunos', gabaritoAlunoRoutes.routes())

// Acessa as rotas GabaritoOficial
const gabaritoOficialRoutes = new GabaritoOficialRoutes(db)
app.use('/gabaritoOficiais', gabaritoOficialRoutes.routes())

//swagger
app.use('/docs', swaggerUi.serve,
swaggerUi.setup(swaggerDocument, {explore: true}))

const port = process.env.PORT || 3001

app.listen(port,() => {
    console.log('Server rodando na porta 3000')
})