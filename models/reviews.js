// Importaciones Generales

const mongoose = require("mongoose");

// ======================================================================

// Modelo de una reseña
const reviewSchema = new mongoose.Schema({
    reviewContent: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 600,
    },
    dateRegister: {
        type: Date,
        default: Date.now,
        required: true,
    },
    game: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Games",
    },
});

// ======================================================================

// Exportaciones Generales

module.exports = mongoose.model('Reviews', reviewSchema)