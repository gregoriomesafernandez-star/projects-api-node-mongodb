//importar la libreria de mongoose
const { Schema, model } = require("mongoose");

//Crear esquema (estructura de cada documento de tipo proyecto) con Schema como Objeto creamos
const ProjectSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: "default.png"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

//Crear el modelo, indicarle la coleccion donde se van a guardar los docs
//exportar el modelo
module.exports = model(
    "Project", 
    ProjectSchema, 
    "projects"
);