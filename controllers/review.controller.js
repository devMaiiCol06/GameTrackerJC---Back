// Importaciones Generales

const Reviews = require("../models/reviews");

// ======================================================================

// Devolver todas las reseñas

// Exportar la funcion de 'showReviews'
exports.showReviews = async (req, res) => {
    try {
        // Obtener los datos proporcionados por el usuario
        const { idGame } = req.body;

        // Verificar lod datos proporcionados por el usuario
        if (!idGame) {
            return res.json({
                message: `Error: Id del juego no proporcionado correctamentamente`,
                status: `eror`,
            });
        }

        // Obtener de la base de datos todas las reseñas
        // del juego proporcionado por el usuario
        const gameReviews = await Reviews.find({ game: idGame });

        // Devolver respuesta al usuario
        return res.json({
            gameReviews: gameReviews,
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

// Guardar nueva reseña

// Exportar la funcion 'addReview'
exports.addReview = async (req, res) => {
    try {
        // Obtener los datos proporcionados por el usuario
        const { reviewContent, idGame } = req.body;

        // Verificar los datos proporcionados por el usuario
        if (!reviewContent || !idGame) {
            // Devolver respuesta
            return res.json({
                message: "Datos proporcionados incompletos",
                status: "error",
            });
        }

        // Verificar el tamaño del contenido de la reseña
        switch (true) {
            case reviewContent.length < 20:
                // Devolver respuesta al usuario
                return res.json({
                    message: `El contenido introducido es demasiado pequeño. Mínimo requerido: 20 caracteres`,
                    status: "error",
                });
            case reviewContent.length > 600:
                // Devolver respuesta al usuario
                return res.json({
                    message: `El contenido introducido es demasiado largo. Máximo permitido: 600 caracteres`,
                    status: "error",
                });
        }

        // Agregar la nueva reseña a la base de datos
        await new Reviews({
            reviewContent: reviewContent,
            game: idGame,
        }).save();

        // Devolver respuesta al usuario
        return res.json({
            message: "Reseña realizada correctamente",
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
