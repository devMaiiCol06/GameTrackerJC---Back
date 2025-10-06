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
        const gameReviews = await Reviews.find({ game: idGame })

        // Devolver respuesta al usuario
        return res.json({
            gameReviews: gameReviews

        })
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
