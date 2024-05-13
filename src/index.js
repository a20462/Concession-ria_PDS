const express = require("express")
const mongoose = require('mongoose');
const path = require("path")

const app = express()
app.use(express.json())
const port = 3000

//Funções (DB)
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
    preco: String,
    cor: String,
}, 'cars'); 

//Peças
const Peca = mongoose.model('Peca', {
    modelo: String, // Mola
    preco: String, // 50€ 
    descricao: String, // A preencher (Peça para marcas: X, Y e Z)
}, 'pecas'); 

//Serviço
const Servico = mongoose.model('Servico', {
    tipo: String, // Limpeza / troca de oleo / manutenção completa etc
    nome: String, // João Silva
    email: String, // JSilva@gmail.com
    telemovel: Number, // 911222333
    estado: String, // Concluido / Pendente
    modelo: String, // 2020 Tesla Model S Performance Edition
    conta: String, // 45€
    data: String, // 18/02/2024
}, 'servicos'); 

/*--------------------------------------------------------------------------------------------- GET - LISTAGEM --------------------------------------------------------------------------------------------------------------------------*/
//GET - Listagem
app.get("/cars", async (req, res) => {
    const cars = await Car.find()
    return res.send(cars)
  })

app.get("/pecas", async (req, res) => {
    const pecas = await Peca.find()
    return res.send(pecas)
  })

app.get("/servicos", async (req, res) => {
    const servicos = await Servico.find()
    return res.send(servicos)
  })

/*--------------------------------------------------------------------------------------------- DEL - APAGAR --------------------------------------------------------------------------------------------------------------------------*/
//DEL - Apagar
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
//Serviço
app.delete("/servicos/:id", async(req, res) => {
    const servico = await Servico.findByIdAndDelete(req.params.id)
    return res.send(servico)
})

/*--------------------------------------------------------------------------------------------- PUT - ATUALIZAR --------------------------------------------------------------------------------------------------------------------------*/
//PUT - Atualizar
//Carro
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

//Peca
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

//Servico
app.put("/servicos/:id", async(req, res) => {
    const servico = await Servico.findByIdAndUpdate(req.params.id, {
        tipo: req.body.tipo,
        nome: req.body.nome,
        email: req.body.email,
        telemovel: req.body.telemovel,
        estado: req.body.estado,
        modelo: req.body.modelo,
        conta: req.body.conta,
        data: req.body.data,
    }, {
        new: true //confirmação
    })
    return res.send(servico)
})

/*--------------------------------------------------------------------------------------------- POST - ADICIONAR --------------------------------------------------------------------------------------------------------------------------*/
//POST - Adicionar
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

//Servico
app.post("/servicos", async (req, res) => {
    const servico = new Servico({
        tipo: req.body.tipo,
        nome: req.body.nome,
        email: req.body.email,
        telemovel: req.body.telemovel,
        estado: req.body.estado,
        modelo: req.body.modelo,
        conta: req.body.conta,
        data: req.body.data,
    })
    await servico.save()
    res.send(servico)
})
/*--------------------------------------------------------------------------------------------- CONEXÃO - DB --------------------------------------------------------------------------------------------------------------------------*/
//Conexão para MongoDB
app.listen(port, () => {
        mongoose.connect('mongodb+srv://NunoCosta99:YBvfZ1kBvhGGZOxF@scfautos-api.ynmru2m.mongodb.net/?retryWrites=true&w=majority&appName=SCFAutos-api')
        console.log('App running')
  })