// Importaciones Generales
const Archievements = require("../models/archievements");

// ======================================================================

// Mostrar todos los logros

// Exportar la funcion de 'showArchievs'
exports.showArchievs = async (req, res) => {
    try {
        // Obtener todos los juegos
        const archievs = await Archievements.find();
        // Devolver una respuesta
        return res.json({ archievs });
    } catch (error) {
        // Manejo de errores
        // Imprimir y responder el error
        console.log("Error: ", error);
        return res.json({
            message: `Error: ${error}`,
            status: "error",
        });
    }
};

// ======================================================================

// Agregar un nuevo logro

// Exportar la funcion de 'addArchievs'
exports.addArchiev = async (req, res) => {
    try {
        // Obtener los datos proporcionados por el usuario
        const {
            archievName,
            archievDescription,
            archievCategory,
            archievStatus,
        } = req.body;

        // Validar si se proporciono al menos un nombre y la categoria para el logro
        if (!archievName || !archievCategory) {
            return res.json({
                message: "Error: Se requiere el nombre del logro",
                status: "error",
            });
        }

        // Verificar si el logro ya existe en la base de datos
        const savedArchiev = await Archievements.findOne({ archievName });

        if (savedArchiev) {
            // Imprimir y responder el error
            return res.json({
                message: `Error: ${archievName} ya existe`,
                status: "error",
            });
        }

        // Agregar el nuevo logro a la base de datos
        await new Archievements({
            archievName,
            archievDescription,
            archievCategory,
            archievStatus,
        }).save();

        // Devolver una respuesta
        return res.json({
            message: `El logro "${archievName}" creado correctamente`,
            status: "success",
        });
    } catch (error) {
        // Manejo de errores
        // Imprimir y responder el error
        console.log("Error: ", error);
        return res.json({
            message: `Error: ${error}`,
            status: "error",
        });
    }
};

// ======================================================================

// Eliminar un logro

// Exportar la funcion de 'deleteArchiev'
exports.deleteArchiev = async (req, res) => {
    try {
        const { archievId } = req.body;

        // Validar si se proporciono el id del logro
        if (!archievId) {
            return res.json({
                message: "Error: Se requiere el id del logro a eliminar",
                status: "error",
            });
        }

        // Obtener el logro a eliminar de la base de datos
        const archievToDelete = await Archievements.findOne({ _id: archievId });

        // Verificar que el logro existe en la base de datos
        if (!archievToDelete) {
            return res.json({
                message: "Error: Logro a eliminar no encontrado",
                status: "error",
            });
        }

        // Elimnar el logro
        await Archievements.deleteOne({ _id: archievToDelete._id });

        // Devolver respuesta al usuario
        return res.json({
            message: `"${archievToDelete.archievName}" eliminado exitosamente`,
            status: `success`,
        });
    } catch (error) {
        // Manejo de errores
        // Imprimir y responder el error
        console.log("Error: ", error);
        return res.json({
            message: `Error: ${error}`,
            status: "error",
        });
    }
};
