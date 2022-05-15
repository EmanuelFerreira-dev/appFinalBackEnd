const { default: axios } = require('axios');
const { validationResult } = require('express-validator');
const req = require('express/lib/request');
const res = require('express/lib/response');
const {Auto} = require('../models/model');
const bcryptjs = require('bcryptjs');

const vistaUno = (req, res)=>{
    res.render('index', { title: 'Express' });
}

const vistaAutos = async (req, res) =>{
    const autos = await Auto.find()
    res.json({autos})
}

const vistaUnAuto = async (req, res) =>{
    const auto = await Auto.findById(req.params.id)
    res.json({auto})
}

/*
const crearAuto = async (req, res)=>{
    const car = new Auto({ patente: req.body.patente, 
                           marca: req.body.marca,
                           modelo: req.body.modelo,
                           año: req.body.año 
                        });
    await car.save()
    console.log(' ')
    res.json({msg: 'Auto creado con Exito!!'})
}
*/
const crearAuto = async (req, res) => {
    console.log(validationResult(req))
    console.log(req.body)

    try {
        const error = validationResult(req)
        if (error.isEmpty()) {
            const { patente, marca, modelo, año, km } = req.body
            const car = new Auto({ patente, marca, modelo, año, km });
            await car.save()
            res.status(201).json({ car, msg: "Nuevo auto ingresado a la base" })
        } else {
            res.status(400).json(error)
        }
    } catch (err) {
        res.status(400).json({ msg: "Esta patente ya exite", err })
    }
}

const editarAuto = async (req, res) => {
    const { id } = req.params
    const body = req.body
    console.log(req.body)
    await Auto.findByIdAndUpdate(id, req.body)
    res.status(201).json(body)
}

const borrarAuto = async (req, res) => {
    const car = await Auto.findByIdAndDelete(req.params.id)
    res.json({ msg: "Eliminado el auto segun el id ingresado", car })
}

const consultaAxios = async (req, res) => {
    const precio = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json", { timeout: 10000 }).catch((err) => {
        err.origin = 'Error buscando El precio de bitcoin';
        throw err;
    });
    res.json(precio.data.bpi.USD)
}





module.exports = {crearAuto, vistaAutos, vistaUnAuto, editarAuto, borrarAuto, consultaAxios}


