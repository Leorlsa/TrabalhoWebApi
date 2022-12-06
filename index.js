//chamando pacotes
const express = require('express')
const app = express()


const mongoose=require('mongoose')
const Linguagens=require("./models/Linguagens")
//Lendo json facilmente

app.use(
    express.urlencoded({
        extended: true,
    })
)


//rotas /end
app.get('/', (req, res) => {
    res.json({msg: 'Hello world!!!'});
});
app.use(express.json())

//CREATE
app.post("/linguagens", async (req, res)=>{
    const {nome, ano, descricao} = req.body
    
    const linguagens = {
        nome,
        ano,
        descricao,
    }
    
if(!nome){
    res.status(422).json({error: 'Nome Obrigatorio'})
}


    try{
        await Linguagens.create(linguagens)
        res.status(201).json({message:'Pessoa inserida'})
    }catch(error){
        res.status(500).json({error:error})
    }
})
//READ
app.get("/linguagens", async (req,res) =>{
    try{
        const todasLinguagens = await Linguagens.find()
        res.status(200).json(todasLinguagens)

    }catch(error){
        res.status(500).json({error:error})
    }
})
//UPDATE
app.patch('/linguagens/:id',async(req,res)=>{
    const id = req.params.id

    const {nome, ano, descricao} = req.body

    const linguagens ={
        nome,
        ano,
        descricao,
    }
try{
const updatedPerson = await Linguagens.updateOne({ _id: id}, linguagens)
res.status(200).json(linguagens)
}catch(error){
    res.status(500).json({error:error})
}
})
//DELETE
app.delete('/linguagens/:id', async (req,res)=>{
    const id = req.params.id
    const linguagens = await Linguagens.findOne({ _id: id})

    if(!linguagens){
        res.status(422).json({message:"O USUARIO N FOI ENCONTRADO"})
        return
    }
    try {
        await Linguagens.deleteOne({ _id: id })
    
        res.status(200).json({ message: 'Usuário removido com sucesso!' })
      } catch (error) {
        res.status(500).json({ erro: "nao deu" })
      }
    })

    
mongoose
  .connect(
    'mongodb+srv://leorlsa:FNS7bh0BPZPhePe6@apicluster.ur3afhd.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Conectou ao banco!HAAHAHAHAHA')
    app.listen(3000)
  })

  .catch((err) => console.log(err))


//senha bd:FNS7bh0BPZPhePe6
//mongodb+srv://leorlsa:FNS7bh0BPZPhePe6@apicluster.ur3afhd.mongodb.net/?retryWrites=true&w=majority