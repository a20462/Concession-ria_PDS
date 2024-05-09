const express = require("express")
const mongoose = require('mongoose');
const path = require("path")


const app = express()
app.use(express.json())
const port = 3000

//DB = dados a preencher
//Carros
/*const Car = mongoose.model('Car', {
    marca: String,
    modelo: String,
    kms: Number,
    combustivel: String,
    ano: Number,
    caixa: String,
    img: String,
    garantia: String,
    preco: Number,
    cor: String,
    });*/
    const Car = mongoose.model('Car', {
        marca: String,
        modelo: String,
        kms: Number,
        combustivel: String,
        ano: Number,
        caixa: String,
        img: String,
        garantia: String,
        preco: Number,
        cor: String,
    }, 'cars'); // Nome da coleção é 'cars'

//Peças
/*const Peca = mongoose.model('Peca', {
    modelo: String,
    preco: Number,
    descricao: String,
})*/
//Peças
const Peca = mongoose.model('Peca', {
    modelo: String,
    preco: Number,
    descricao: String,
}, 'pecas'); // Nome da coleção é 'pecas'


//Listagem db
app.get("/cars", async (req, res) => {
    const cars = await Car.find()
    return res.send(cars)
  })

  app.get("/pecas", async (req, res) => {
    const pecas = await Peca.find()
    return res.send(pecas)
  })

//Apagar db por id (:id)
//Carro
app.delete("/cars/:id", async(req, res) => {
    const car = await Car.findByIdAndDelete(req.params.id)
    return res.send(car)
})

//Peça
app.delete("/pecas/:id", async(req, res) => {
    const peca = await Peca.findByIdAndDelete(req.params.id)
    return res.send(peca)
})


//Update db por id (:id)
//Carros
app.put("/cars/:id", async(req, res) => {
    const car = await Car.findByIdAndUpdate(req.params.id, {
        marca: req.body.marca,
        modelo: req.body.modelo,
        kms: req.body.kms,
        combustivel: req.body.combustivel,
        ano: req.body.ano,
        caixa: req.body.caixa,
        img: req.body.img,
        garantia: req.body.garantia,
        preco: req.body.preco,
        cor: req.body.cor,
    }, {
        new: true //confirmação
    })
    return res.send(car)
})

//Pecas
app.put("/pecas/:id", async(req, res) => {
    const peca = await Peca.findByIdAndUpdate(req.params.id, {
        modelo: req.body.modelo,
        preco: req.body.preco,
        descricao: req.body.descricao,
    }, {
        new: true //confirmação
    })
    return res.send(peca)
})

//Criar - DB
//Carro
app.post("/cars", async (req, res) => {
    const car = new Car({
        marca: req.body.marca,
        modelo: req.body.modelo,
        kms: req.body.kms,
        combustivel: req.body.combustivel,
        ano: req.body.ano,
        caixa: req.body.caixa,
        img: req.body.img,
        garantia: req.body.garantia,
        preco: req.body.preco,
        cor: req.body.cor,
    })
    await car.save()
    res.send(car)
})

//Peca
app.post("/pecas", async (req, res) => {
    const peca = new Peca({
        tipo: req.body.tipo,
        preco: req.body.preco,
        descricao: req.body.descricao,
    })
    await peca.save()
    res.send(peca)
})
// Rota para adicionar uma peça
/*app.post("/pecas", async (req, res) => {
    const peca = new Peca({
        modelo: req.body.modelo,
        preco: req.body.preco,
        descricao: req.body.descricao,
    });

    try {
        const novaPeca = await peca.save();
        res.send(novaPeca);
    } catch (error) {
        res.status(500).send(error);
    }
})*/

//Conexão para MongoDB
app.listen(port, () => {
        mongoose.connect('mongodb+srv://NunoCosta99:YBvfZ1kBvhGGZOxF@scfautos-api.ynmru2m.mongodb.net/?retryWrites=true&w=majority&appName=SCFAutos-api')
        console.log('App running')
  })