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

        // Devolver respuesta de exito al usuario
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
            // Devolver respuesta de error al usuario
            return res.json({
                message: "Datos proporcionados incompletos",
                status: "error",
            });
        }

        // Verificar el tamaño del contenido de la reseña
        switch (true) {
            case reviewContent.length < 20:
                // Devolver respuesta de error al usuario
                return res.json({
                    message: `El contenido introducido es demasiado pequeño. Mínimo requerido: 20 caracteres`,
                    status: "error",
                });
            case reviewContent.length > 600:
                // Devolver respuesta de error al usuario
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

        // Devolver respuesta de exito al usuario
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

// ======================================================================

// Eliminar una reseña

// Exportar la funcion 'deleteReview'
exports.deleteReview = async (req, res) => {
    try {
        // Obtener los datos proporcionados por el usuario
        const { idReview } = req.body;

        // Verificar los datos proporcioandos por el usuario
        if (!idReview) {
            // Devolver respuesta de error al usaurio
            return res.json({
                message: "No se proporciono el id de la reseña a eliminar",
                status: "error",
            });
        }

        // Obtener la reseña a elimnar de la base de datos
        const reviewToDelete = await Reviews.findOne({ _id: idReview})

        // Verificar que si exista una reseña a eliminar
        if (!reviewToDelete) {
            // Devolver respuesta de error al usuario
            res.json({
                message: "La reseña no existe",
                status: 'error'
            });
        }

        // Eliminar la reseña mediante el id proporcionado
        await Reviews.deleteOne({ _id: reviewToDelete._id });

        // Devolver respuesta de exito al usuario
        return res.json({
            message: "Reseña eliminada correctamente",
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
}