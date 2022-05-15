const express = require('express');
const router = express.Router();
const { crearAuto, vistaAutos, vistaUnAuto, editarAuto, borrarAuto, consultaAxios } = require("../controller/controller");
const { check, validationResult, body } = require("express-validator");

/* Ver todos los Autos de la base*/
router.get("/ver", vistaAutos); 
/* Consulta axios a una Api externa*/
router.get("/bitcoin", consultaAxios); 
router.get("/ver/:id", vistaUnAuto);
/* Crear Auto con condiciones*/
router.post("/crear", [
    check("patente").not().isEmpty().isLength({ max: 7, min: 6 }).withMessage("La patente debe ser de 6 o 7 caracteres alfanumericos"),
    check("modelo").not().isEmpty().withMessage("El modelo del auto es necesario")],
    crearAuto); 
/* Editar Auto KM del auto*/    
router.put("/editar/:id", editarAuto);
/* Eliminar Auto por ID*/ 
router.delete("/eliminar/:id", borrarAuto) 

module.exports = router;
