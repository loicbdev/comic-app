const express = require('express');
const router = express.Router();
const showsCtrl = require("../controllers/shows.controller");

// CREATE : As a user, I want to be able to create a new show.
router.post("/", showsCtrl.createShow);
// READ : As a user, I want to be able to see all shows.
router.get('/', showsCtrl.getAllShows);
// READ : As a user, I want to be able to see a show by entering its id in the url.
router.get("/:id", showsCtrl.getOneShow);
// READ : Filter "top or not"
router.get("/top/:favorites", showsCtrl.getTopShows);
// READ : Search by artist'name
router.get("/artists/contains", showsCtrl.getAllShowsByArtist);
// UPDATE : As a user, I want to be able to modify a show.
router.put("/update/:id", showsCtrl.modifyShow);
// DELETE : As a user, I want to be able to delete a show.
router.delete("/delete/:id", showsCtrl.deleteShow);

module.exports = router;