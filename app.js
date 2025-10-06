// Importaciones Generales

const express = require("express");
const connDB = require("./database/mongoConnection");
const routes = require("./routes/routes");

// ======================================================================

// Crear el server con Express
const app = express();

// Middlewares
app.use(express.json());

// Conectar a la base de datos mediante la funcion importada desde el archivo de conexion
connDB();

// Delegar la gestion de las rutas a su controlador importado
app.use("/", routes);

// Configurar el puerto de escucha del servidor
app.listen(3000, () => {
    // Imprimir mensaje de estado
    console.log("Server Running in http://localhost:3000");
});
