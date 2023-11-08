import express from 'express'
import db from "./database/database.js"
import GabaritoRoutes from "./routes/GabaritoRoutes.js"
import AlunoRoutes from "./routes/AlunoRoutes.js"

const app = express()
app.use(express.json())

app.get('/healthcheck',(req,res)=>{
    res.send('Ok!')
})

// Acessa as rotas Gabarito
const gabaritoRoutes = new GabaritoRoutes(db)
app.use('/gabaritos', gabaritoRoutes.routes())

// Acessa as rotas Aluno
const alunoRoutes = new AlunoRoutes(db)
app.use('/alunos', alunoRoutes.routes())

app.listen(3000,() => {
    console.log('Server rodando na porta 3000')
})

//console.log(db.alunos)
//console.log(db.gabaritos)