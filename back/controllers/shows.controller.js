const connection = require('../database/config');

// CREATE : As a user, I want to be able to create a new show.

exports.createShow = (req, res) => {
    const { artist, show_name, year, duration, favorites, show_url } = req.body;
    connection.query(
      "INSERT INTO comic (artist, show_name, year, duration, favorites, show_url) VALUES(?, ?, ?, ?, ?, ?)",
      [artist, show_name, year, duration, favorites, show_url],
      (error, result) => {
        if(error) {
          res.status(500).send(error);
        } else if(result.affectedRows < 1) {
          res.sendStatus(404);
        } else {
          res.status(201).json({
            id: result.insertId,
            ...req.body,
          });
        }
      }
    );
  };

// READ : As a user, I want to be able to see all shows.

exports.getAllShows = (req, res) => {
  connection.query('SELECT * FROM comic', (error, result) => {
      if(error) {
        res.status(500).send(error);
      }
      if(result.lenght === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json(result);
      }
  });
};

// READ : As a user, I want to be able to see a show by entering its id in the url.

exports.getOneShow = (req, res) => {
    connection.query(
      `SELECT * FROM comic WHERE id=?`,
      [req.params.id],
      (error, result) => {
        if (error) {
          res.status(500).send(error);
        } else if (result.length === 0) {
          res.sendStatus(404);
        } else {
          res.status(200).json(result[0]);
        }
      }
    );
  };

// READ : Filter "top or not"

exports.getTopShows = (req, res) => {
  connection.query(
    `SELECT * FROM comic WHERE favorites = ?`,
    [req.params.favorites],
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else if (result.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json(result);
      }
    }
  );
};

// READ : Search by artist'name

// ex : http://localhost:8080/shows/artists/contains?artist=Dédo

exports.getAllShowsByArtist = (req, res) => {
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
};
  
// UPDATE : As a user, I want to be able to modify a show.

exports.modifyShow = (req, res) => {
  let sql = "UPDATE comic SET ? WHERE id=?";
  connection.query(sql, [req.body, req.params.id], (error, result) => {
    if (error) {
      res.status(500).send({ errorMessage: 'Error to update the show' });
    } else {
      sql = "SELECT * FROM comic WHERE id=?";
      connection.query(sql, req.params.id, (error, result) => {
        if (result.length === 0) {
          res.status(404).send({ errorMessage: `No show found with this id: ${req.params.id}` });
        } else {
          res.status(200).json(result[0]);
        }
      });
    }
  });
};

// DELETE : As a user, I want to be able to delete a show.

exports.deleteShow = (req, res) => {
  const ShowId = req.params.id;
  connection.query(
    "DELETE FROM comic WHERE id = ?",
    [ShowId],
    (error) => {
      if (error) {
        console.log(error);
        res.status(500).send("Error deleting a show");
      } else {
        res.status(200).send("Show deleted!");
      }
    }
  );
};

