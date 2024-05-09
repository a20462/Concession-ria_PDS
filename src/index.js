const express = require("express")
const mongoose = require('mongoose');
const path = require("path")

const app = express()
app.use(express.json())
const port = 3000

//DB = dados a preencher
//Carros
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
    });

//Peças
const Peca = mongoose.model('Peca', {
    tipo: String,
    preco: Number,
    descricao: String,
})

//Listagem db = lista todos os carros 
app.get("/", async (req, res) => {
    const cars = await Car.find()
    return res.send(cars)
  })

  app.get("/", async (req, res) => {
    const pecas = await Peca.find()
    return res.send(pecas)
  })

//Apagar db por id (:id)
//Carro
app.delete("/:id", async(req, res) => {
    const car = await Car.findByIdAndDelete(req.params.id)
    return res.send(car)
})

//Peça
app.delete("/:id", async(req, res) => {
    const peca = await Car.findByIdAndDelete(req.params.id)
    return res.send(peca)
})


//Update db por id (:id)
//Carros
app.put("/:id", async(req, res) => {
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
app.put("/:id", async(req, res) => {
    const peca = await Peca.findByIdAndUpdate(req.params.id, {
        tipo: req.body.tipo,
        preco: req.body.preco,
        descricao: req.body.descricao,
    }, {
        new: true //confirmação
    })
    return res.send(peca)
})

//Carro
app.post("/", async (req, res) => {
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

//Criar - DB
//Peca
app.post("/", async (req, res) => {
    const peca = new Peca({
        tipo: req.body.tipo,
        preco: req.body.preco,
        descricao: req.body.descricao,
    })
    await peca.save()
    res.send(peca)
})

//Conexão para MongoDB
app.listen(port, () => {
        mongoose.connect('mongodb+srv://NunoCosta99:YBvfZ1kBvhGGZOxF@scfautos-api.ynmru2m.mongodb.net/?retryWrites=true&w=majority&appName=SCFAutos-api')
        console.log('App running')
  })