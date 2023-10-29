import express from 'express'
import database from './database/database.js'
import GabaritoRoutes from './routes/GabaritoRoutes'

const app = express()
app.use(express.json())

app.get('/healthcheck',(req,res)=>{
    res.send('Ok!')
})

//acessa as rotas Gabarito
const gabaritoRoutes = new GabaritoRoutes(database)
app.use('/gabaritos',gabaritoRoutes.routes())

app.listen(3000,() => {
    console.log('Server rodando na porta 3000')
})