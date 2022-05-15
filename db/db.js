const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {  
        await mongoose.connect( process.env.MONGO_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } )
        console.log('Base de datos conectada con Exito');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos')   
    }
}

module.exports = {dbConnection}
