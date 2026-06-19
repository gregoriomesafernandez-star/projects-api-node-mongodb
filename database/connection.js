const mongoose = require("mongoose");

const connection = async() => {
    try{

        await mongoose.connect("mongodb://127.0.0.1/bd-portafolio");

        console.log("Conectado a la base de datos: bd-portafolio");

    }catch(error){
        
        console.log(error);

        throw new Error("No se ha podido establecer conexion a la BD");
    }
}

module.exports = connection;