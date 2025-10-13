// Importaciones Generales

const mongoose = require("mongoose");

// ======================================================================

// Modelo de un logro/s
const archievementSchema = new mongoose.Schema({
    archievName: {
        type: String,
        required: true,
        unique: true,
    },
    archievDescription: {
        type: String,
    },
    archievCategory: {
        type: String,
        enum: ["Legendary", "Mythic", "Epic"],
        required: true,
    },
    archievStatus: {
        type: String,
        enum: ["unlocked", "locked"],
        required: true,
        default: "locked",
    },
    archievUnlockedDate: {
        type: Date,
    },
});


// ======================================================================

// Exportaciones Generales

module.exports = mongoose.model("Archievements", archievementSchema);
