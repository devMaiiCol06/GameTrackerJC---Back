// Importaciones Generales

const mongoose = require("mongoose");

// ======================================================================

// Modelo de un juego/s
const gameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        enum: [
            "Action",
            "Adventure",
            "RPG",
            "Strategy",
            "Simulation",
            "Sport",
            "Racing",
            "Puzzle",
            "Shooter",
            "Fight",
            "Open World",
            "Terror",
        ],
        required: true,
    },
    status: {
        type: String,
        enum: ["Completed", "In Progress"],
        default: "In Progress",
        required: true,
    },
    platform: {
        type: String,
        enum: ["PlayStation", "Xbox", "PC", "Nintendo Switch", "VR", "Phone"],
    },
    dateRegister: {
        type: Date,
        default: Date.now,
        required: true,
    },
    hoursPlayed: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: true,
        default:
            "https://i.pinimg.com/1200x/68/3d/4b/683d4b62ef458b9ddd01b1227f900ec4.jpg",
    },
});


// ======================================================================

// Exportaciones Generales

module.exports = mongoose.model("Games", gameSchema);
