const Project = require("../models/project");
const fs = require("fs");
const path = require("path"); // Podemos trabajar con el sistema de archivos y  con fs

// Guardamos
const save = (req, res) => { 

    //Recibo datos
    const { name, description, state } = req.body;

    //Valido datos
    if (!name || !description || !state) {

        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });

    }

    //Crear objeto
    const projectToSave = new Project({
        name,
        description,
        state
    });
    
    //Guardo el objeto en la BD
    projectToSave.save()
                  .then(project => {

                    return res.status(201).json({
                        status: "success",
                        project
                    });

                 })
                .catch( error => {

                    return res.status(500).send({
                        status: "error",
                        message: "Error al guardar el proyecto",
                        error
                    });

                });
}

//Listar proyectos
const list = (req, res) => { 

    Project.find().sort({ created_at: -1 })
           .then(projects =>  {

                return res.status(200).send({
                    status: "success",
                    projects
                });

            })
            .catch( error => {

                return res.status(500).send({
                    status: "error",
                    message: "Error al listar los proyectos",
                    error
                });

            });
}

//Buscar proyecto por ID
const item = (req, res) => { 

    const id = req.params.id;

    Project.findById(id)
           .then(project =>  {

                if(!project){
                    return res.status(404).send({
                        status: "error",
                        message: "No se ha encontrado el proyecto"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    project
                });

            })
            .catch( error => {

                return res.status(500).send({
                    status: "error",
                    message: "Error al buscar el proyecto"
                });

            });

}


//Eliminar por ID
const deleteProject = (req, res) => { 

    const id = req.params.id;

    Project.findByIdAndDelete(id)
           .then(project =>  {  

                if(!project){
                    return res.status(404).send({
                        status: "error",
                        message: "No se ha encontrado el proyecto"
                    });
                }

                // Borrar imagen si existe
                if (project.image && project.image !== "default.png") {

                    const imagePath = "./uploads/images/" + project.image;

                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }

                return res.status(200).send({
                    status: "success",
                    project
                });

            })
            .catch( error => {

                return res.status(500).send({
                    status: "error",
                    message: "Error al borrar el proyecto"
                });

            });

}

//Actualizar por ID
const update = (req, res) => {

    const { id, name, description, state } = req.body;

    //Validar ID
    if (!id){
        return res.status(400).send({
            status: "error",
            message: "Falta el ID del proyecto"
        });
    }

    // Validar datos
    if (!name || !description || !state) {
        return res.status(400).send({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    // Datos a actualizar
    const projectData = {
        name,
        description,
        state
    };

    Project.findByIdAndUpdate(id, projectData, { new: true})
           .then(projectUpdate  => {

                if(!projectUpdate){
                    return res.status(404).send({
                        status: "error",
                        message: "No se ha encontrado el proyecto"
                    });
                }

                return res.status(200).send({
                    status: "success",
                    project: projectUpdate
                });

           })
           .catch( error => { 

                return res.status(500).send({
                    status: "error",
                    message: "Error al actualizar el proyecto"
                });

            });
}

//Subir Image
const upload = (req, res) => {

    const id = req.params.id;

    if(!req.file){ 

        return res.status(400).json({
                        status: "error",
                        message: "No se ha subido nada"
        });
    }

    const filePath = req.file.path; //Ruta de arhivo donde se encuentra
    const extension = path.extname(req.file.originalname).toLowerCase().replace(".",""); //Obtenemos extension limpia sin .
    const validExtensions = ["png", "jpg", "jpeg", "gif"];

    if(!validExtensions.includes(extension)){

        fs.unlinkSync(filePath);    //Elimina archivo subido
        
        return res.status(400).json({
                        status: "error",
                        message: "La extension no es válida"
        });

    }

    Project.findByIdAndUpdate({_id: id}, {image: req.file.filename}, { returnDocument: 'before' })
           .then(projectUpdate  => {

                if(!projectUpdate){

                    fs.unlinkSync(filePath); 

                    return res.status(404).send({
                        status: "error",
                        message: "No se ha encontrado el proyecto"
                    });
                }

                if(projectUpdate.image && projectUpdate.image != "default.png"){

                    const oldImagePath = "./uploads/images/" + projectUpdate.image;

                    if(fs.existsSync(oldImagePath)){

                        fs.unlinkSync(oldImagePath);
                    
                    }
                }

                return res.status(200).send({
                    status: "success",
                    project: projectUpdate,
                    newFile: req.file.filename
                });

           })
           .catch( error => { 

                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
                return res.status(500).send({
                    status: "error",
                    message: "Error al subir la imagen"
                });

            });
}

//Sacamos imagen del backend al frontend
const getImage = (req, res) => {

    const file = req.params.file;

    //Construir ruta del fichero
    const filePath = "./uploads/images/" + file;

    //Comprobar si existe
    fs.stat(filePath, (error, exists) => {

        if(!error && exists){    //Devolver respuesta
            
            return res.sendFile(path.resolve(filePath));
                
        }

        return res.status(404).json({
                    status: "error",
                    message: "La imagen no existe"
        });
        
    });

    
}   

module.exports = {
    save,
    list,
    item,
    deleteProject,
    update,
    upload,
    getImage
};