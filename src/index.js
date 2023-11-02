import express from 'express'
import db from './database/config.js'
import AlunoRoutes from './routes/AlunoRoutes.js'

const app = new express()

app.use(express.json())

const alunoRoutes = new AlunoRoutes(db)
app.use('/alunos', alunoRoutes.routes())

app.listen(3000,() => {
    console.log('Server rodando na porta 3000')
})