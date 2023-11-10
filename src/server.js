import express from 'express'
import db from "./database/database.js"
import AlunoRoutes from "./routes/AlunoRoutes.js"
import GabaritoAlunoRoutes from "./routes/GabaritoAlunoRoutes.js"
import GabaritoOficialRoutes from "./routes/GabaritoOficialRoutes.js"

const app = express()
app.use(express.json())

app.get('/healthcheck',(req,res)=>{
    res.send('Ok!')
})

// Acessa as rotas Aluno
const alunoRoutes = new AlunoRoutes(db)
app.use('/alunos', alunoRoutes.routes())

// Acessa as rotas GabaritoAluno
const gabaritoAlunoRoutes = new GabaritoAlunoRoutes(db)
app.use('/gabaritoAlunos', gabaritoAlunoRoutes.routes())

// Acessa as rotas GabaritoOficial
const gabaritoOficialRoutes = new GabaritoOficialRoutes(db)
app.use('/gabaritoOficiais', gabaritoOficialRoutes.routes())

app.listen(3000,() => {
    console.log('Server rodando na porta 3000')
})

//console.log(db.alunos)
//console.log(db.gabaritoOficiais)