//Importar dependencias
const connection = require("./database/connection");
const express = require("express");
const cors = require("cors");       //Quita errores y el acesso cruzado a dominios


//Conexion a la BD
connection();

//Crear el servidor
const app = express();
const port = process.env.PORT | 3977;

//Configurar el cors
app.use(cors());        //Evitamos maximos errores en local

//Convertir los datos del body a objetos
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cargar rutas
const projectRoutes = require("./routes/project");
app.use('/api/project', projectRoutes);

//Poner el servidor a escuchar
app.listen(port, () => {
    console.log("Servidor está corriendo correctamente, en el puerto "+port);
});