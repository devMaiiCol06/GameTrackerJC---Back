// Importaciones Generales

const mongoose = require('mongoose')

// ======================================================================

// URI de MongoDB
const databaseURI =
    "mongodb+srv://visitor:IgcBPYmYDk23Z0cP@gametrackerjv.55ihzb3.mongodb.net/GameTrackerJC?retryWrites=true&w=majority&appName=GameTrackerJV";

// Intentar conectar a MongoDB
const connDB = async () => {
    try {
        await mongoose.connect(databaseURI)
        console.log('Connected Database') // Devolver mensaje de estado
    } catch (error) {
        // Manejo de errores al conectar

        // Imprimir por consola y cerrar todos los procesos
        console.log('Error: Not Connected database', error)
        process.exit(1)
    }
}

// ======================================================================

// Exportaciones Generales

module.exports = connDB