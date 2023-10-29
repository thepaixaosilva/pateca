import express from 'express'

const app = express()
app.use(express.json())

app.get('/healthcheck',(req,res)=>{
    res.send('Ok!')
})

app.listen(3000,() => {
    console.log('Server rodando na porta 3000')
})