const express = require('express');
const connection = require('../database/config');
const router = express.Router();

router.get('/', (request, response) => {
    connection.query('SELECT * FROM comic', (error, result) => {
        if(error) {
          response.status(500).send(error);
        }
        if(result.lenght === 0) {
          response.sendStatus(404);
        } else {
          response.status(200).json(result);
        }
    });
});

// 1.CREATE : As a user, I want to be able to create a new show.

router.post("/", (request, response) => {
    const { artist, show_name, year, duration, favorites, show_url } = request.body;
    connection.query(
      "INSERT INTO comic (artist, show_name, year, duration, favorites, show_url) VALUES(?, ?, ?, ?, ?, ?)",
      [artist, show_name, year, duration, favorites, show_url],
      (error, result) => {
        if(error) {
          response.status(500).send(error);
        } else if(result.affectedRows < 1) {
          response.sendStatus(404);
        } else {
          response.status(201).json({
            id: result.insertId,
            ...request.body,
          });
        }
      }
    );
  });

// 2.READ : As a user, I want to be able to see a show by entering its id in the url.

  router.get("/:id", (request, response) => {
    connection.query(
      `SELECT * FROM comic WHERE id=?`,
      [request.params.id],
      (error, result) => {
        if (error) {
          response.status(500).send(error);
        } else if (result.length === 0) {
          response.sendStatus(404);
        } else {
          response.status(200).json(result[0]);
        }
      }
    );
  });
  

  // 3.UPDATE : As a user, I want to be able to modify a show.

router.put("/update/:id", (request, response) => {
  let sql = "UPDATE comic SET ? WHERE id=?";
  connection.query(sql, [request.body, request.params.id], (error, result) => {
    if (error) {
      response.status(500).send({ errorMessage: 'Error to update the show' });
    } else {
      sql = "SELECT * FROM comic WHERE id=?";
      connection.query(sql, request.params.id, (error, result) => {
        if (result.length === 0) {
          response.status(404).send({ errorMessage: `No show found with this id: ${request.params.id}` });
        } else {
          response.status(200).json(result[0]);
        }
      });
    }
  });
});


// 4.DELETE : As a user, I want to be able to delete a show.

router.delete("/delete/:id", (request, response) => {
  const TutorialId = request.params.id;
  connection.query(
    "DELETE FROM comic WHERE id = ?",
    [TutorialId],
    (error) => {
      if (error) {
        console.log(error);
        response.status(500).send("Error deleting a show");
      } else {
        response.status(200).send("Show deleted!");
      }
    }
  );
});

// 5.READ : Filter "top or not"

router.get("/top/:favorites", (request, response) => {
  connection.query(
    `SELECT * FROM comic WHERE favorites = ?`,
    [request.params.favorites],
    (error, result) => {
      if (error) {
        response.status(500).send(error);
      } else if (result.length === 0) {
        response.sendStatus(404);
      } else {
        response.status(200).json(result);
      }
    }
  );
});

// 6. GET - Search by artist'name

// ex : http://localhost:8080/shows/artists/contains?artist=Dédo

router.get("/artists/contains", (req, res) => {
  connection.query(
    `SELECT * FROM comic WHERE artist LIKE ?`,
    [`%${req.query.artist}%`],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});


module.exports = router;