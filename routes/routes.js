//Importaciones generales
const express = require("express");
const router = express.Router();

// ======================================================================

// Importaciones de los Controladores
const gameController = require('../controllers/game.controller')
const reviewController = require("../controllers/review.controller");

// ======================================================================

// Rutas de Juegos
router.get("/showGames", gameController.showGames);
router.post("/addGame", gameController.addGame);
router.put("/updateGame", gameController.updateGame);
router.delete("/deleteGame", gameController.deleteGame);

// Rutas de Reseñas
router.get("/showReviews", reviewController.showReviews);
// router.post("/addReview", reviewController.addReview);
// router.put("/updateReview", reviewController.updateReview);
// router.delete("/deleteReview", reviewController.deleteReview);

// ======================================================================

// Exportaciones Generales

module.exports = router;
