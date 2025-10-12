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
        return res.json({ games });
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
        const {
            gameName,
            gameDescription,
            gameGenre,
            gameStatus,
            gamePlatform,
            gameHoursPlayed,
            gameImage,
        } = req.body;

        // Validar si se proporciono al menos un nombre para el juego
        if (!gameName) {
            return res.json({
                message: "Error: Se requiere el nombre del juego",
                status: "error",
            });
        }

        // Verificar si el jeugo ya existe en la base de datos
        const savedGame = await Games.findOne({ gameName });

        if (savedGame) {
            // Imprimir y responder el error
            return res.json({
                message: `Error: ${gameName} ya se encuentra en tu biblioteca`,
                status: "error",
            });
        }

        // Obtener fecha del juego completado
        let gameDateCompleted = ""
        gameStatus === "Completed"
            ? gameDateCompleted = Date.now()
            : gameDateCompleted;

        // Agregar el nuevo juego a la base de datos
        await new Games({
            gameName,
            gameDescription,
            gameGenre,
            gameStatus,
            gamePlatform,
            gameDateCompleted,
            gameHoursPlayed,
            gameImage,
        }).save();

        // Devolver respuesta al usuario
        return res.json({
            message: `${gameName} agregado exitosamente`,
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
        const {
            gameId,
            gameName,
            gameDescription,
            gameGenre,
            gameStatus,
            gamePlatform,
            gameDateCompleted,
            gameHoursPlayed,
            gameImage,
        } = req.body;

        // Verificar los datos proporcionados por el usuario
        if (!gameId) {
            return res.json({
                message: "Error: Se requiere el id del juego a modificar",
                status: "error",
            });
        }

        // Obtener el juego de la base de datos mediante el
        // id proporcionado por el usuario
        const gameToUpdate = await Games.findOne({ _id: gameId });

        // Verificar que el juego existe en la base de datos
        if (!gameToUpdate) {
            return res.json({
                message: "Error: Juego no encontrado",
                status: "error",
            });
        }

        // Actualizar solo los campos del juego proporcionados
        // por el usuario
        if (gameName) gameToUpdate.gameName = gameName;
        if (gameDescription) gameToUpdate.gameDescription = gameDescription;
        if (gameGenre) gameToUpdate.gameGenre = gameGenre;
        if (gameStatus) gameToUpdate.gameStatus = gameStatus;
        if (gamePlatform) gameToUpdate.gamePlatform = gamePlatform;
        if (gameDateCompleted) gameToUpdate.gameDateCompleted = gameDateCompleted;
        if (gameHoursPlayed !== undefined) gameToUpdate.gameHoursPlayed = gameHoursPlayed;
        if (gameImage !== undefined) gameToUpdate.gameImage = gameImage;

        // Guardar los cambios en la base de datos
        await gameToUpdate.save();

        // Devolver respuesta al usuario
        return res.json({
            message: `${gameToUpdate.gameName} editado exitosamente`,
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
        const { gameId } = req.body;

        // Verificar los datos proporcionados por el usuario
        if (!gameId) {
            return res.json({
                message: "Error: Se requiere el id del juego a elimnar",
                status: "error",
            });
        }

        // Obtener el juego a eliminar de la base de datos
        const gameToDelete = await Games.findOne({ _id: gameId });

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
            message: `${gameToDelete.gameName} elimnado exitosamente`,
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
