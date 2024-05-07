const express = require("express")
const mongoose = require('mongoose');

const app = express()
app.use(express.json())
const port = 3000

//Carros db = dados a preencher
const Car = mongoose.model('Car', {
    marca: String,
    modelo: String,
    //kms: Int16Array,
    combustivel: String,
    //ano: Int16Array,
    mudancas: String,
    //img: String,
    //garantia: Int16Array,
    });

//Listagem db = lista todos os carros 
app.get("/", async (req, res) => {
    const cars = await Car.find()
    return res.send(cars)
  })

//Apagar db por id (:id) = permite apagar carros por id
app.delete("/:id", async(req, res) => {
    const car = await Car.findByIdAndDelete(req.params.id)
    return res.send(car)
})

//Update db por id (:id) = permite atulizar dados por id
app.put("/:id", async(req, res) => {
    const car = await Car.findByIdAndUpdate(req.params.id, {
        marca: req.body.marca,
        modelo: req.body.modelo,
        //kms: req.body.kms,
        combustivel: req.body.combustivel,
        //ano: req.body.ano,
        mudancas: req.body.mudancas,
        //img: req.body.img,
        //garantia: req.body.garantia,
    }, {
        new: true
    })
    return res.send(car)
})

app.post("/", async (req, res) => {
    const car = new Car({
        marca: req.body.marca,
        modelo: req.body.modelo,
        //kms: req.body.kms,
        combustivel: req.body.combustivel,
        //ano: req.body.ano,
        mudancas: req.body.mudancas,
        //img: req.body.img,
        //garantia: req.body.garantia,
    })
    await car.save()
    res.send(car)
})

//Conexão para MongoDB
app.listen(port, () => {
        mongoose.connect('mongodb+srv://NunoCosta99:3vfaIMGMttvnmYJx@scfautos-api.ynmru2m.mongodb.net/?retryWrites=true&w=majority&appName=SCFAutos-api')
        console.log('App running')
  })