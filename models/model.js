const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const storeSchema = new Schema({
    patente: {
        type: String,
        required: true,
        unique: true,
    },
    marca: {
        type: String,
        required: true,
    },
    modelo: {
        type: String,
        required: true,
        unique: true,
    },
    año: {
        type: Number,
        required: true,
    },
    km: {
        type: Number,
    },

});
const Auto = mongoose.model('Auto', storeSchema);

module.exports = {Auto}