// Importaciones Generales
const Games = require("../models/games");

// ======================================================================

// Mostrar todos los juegos

// Exportar la funcion de 'showGames'
exports.showGames = async (req, res) => {
    try {
        // Obtener todos los juegos
        const games = await Games.find();
        // Devolver una respuesta
        return res.json({
            gameList: games,
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

// Agregar un nuevo juego

// Exportar la funcion de 'addGame'
exports.addGame = async (req, res) => {
    try {
        // Obtener los datos proporcionados por el usuario
        const { name, genre, status, platform, hoursPlayed, image } = req.body;

        // Validar si se proporciono al menos un nombre para el juego
        if (!name) {
            return res.json({
                message: "Error: Se requiere el nombre del juego",
                status: "error",
            });
        }

        // Verificar si el jeugo ya existe en la base de datos
        const savedGame = await Games.findOne({ name });

        if (savedGame) {
            // Imprimir y responder el error
            return res.json({
                message: `Error: ${name} ya se encuentra en tu biblioteca`,
                status: "error",
            });
        }

        // Agregar el nuevo juego a la base de datos
        await new Games({
            name,
            genre,
            status,
            platform,
            hoursPlayed,
            image,
        }).save();

        // Devolver respuesta al usuario
        return res.json({
            message: `${name} agregado exitosamente`,
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

// Actualizar la informacion de un juego

// Exportar la funcion de 'updateGame'
exports.updateGame = async (req, res) => {
    try {
        // Obtener los datos proporcionados por el usuario
        const { id, name, genre, status, platform, hoursPlayed, image } = req.body;

        // Verificar los datos proporcionados por el usuario
        if (!id) {
            return res.json({
                message: "Error: Se requiere el id del juego a modificar",
                status: "error",
            });
        }

        // Obtener el juego de la base de datos mediante el
        // id proporcionado por el usuario
        const gameToUpdate = await Games.findOne({ _id: id });

        // Verificar que el juego existe en la base de datos
        if (!gameToUpdate) {
            return res.json({
                message: "Error: Juego no encontrado",
                status: "error",
            });
        }

        // Actualizar solo los campos del juego proporcionados
        // por el usuario
        if (name) gameToUpdate.name = name;
        if (genre) gameToUpdate.genre = genre;
        if (status) gameToUpdate.status = status;
        if (platform) gameToUpdate.platform = platform;
        if (hoursPlayed !== undefined) gameToUpdate.hoursPlayed = hoursPlayed;
        if (image !== undefined) gameToUpdate.image = image;

        // Guardar los cambios en la base de datos
        await gameToUpdate.save();

        // Devolver respuesta al usuario
        return res.json({
            message: `${gameToUpdate.name} editado exitosamente`,
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

// ======================================================================

// Eliminar un juego

// Exportar la funcion de 'deleteGame'
exports.deleteGame = async (req, res) => {
    try {
        // Obtener los datos proporcionados por el usuario
        const { id } = req.body;

        // Verificar los datos proporcionados por el usuario
        if (!id) {
            return res.json({
                message: "Error: Se requiere el id del juego a elimnar",
                status: "error",
            });
        }

        // Obtener el juego a eliminar de la base de datos
        const gameToDelete = await Games.findOne({ _id: id });

        // Verificar que el juego existe en la base de datos
        if (!gameToDelete) {
            return res.json({
                message: "Error: Juego no encontrado",
                status: "error",
            });
        }

        // Elimnar el juego
        await Games.deleteOne({ _id: gameToDelete._id });

        // Devolver respuesta al usuario
        return res.json({
            message: `${gameToDelete.name} elimnado exitosamente`,
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
