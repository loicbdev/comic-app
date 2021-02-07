import React, { useState } from "react";
import PropTypes from "prop-types";
import ShowDataService from "../services/ShowDataService";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const ADD = styled.div`
  max-width: 300px;
  margin: auto;
  padding-top: 2rem;

  .btn.btn-success {
    background-color: #900f0f;
    border-color:#900f0f;
  }

  .title {
    padding-bottom: 1.5rem;
  }

  .success-title {
    padding-bottom: 1.5rem;
  }
`;

const AddShow = () => {
  const initialComicState = {
    id: null,
    artist: "",
    show_name: "",
    year: "",
    duration: "",
    favorites: false,
    show_url: "",
  };
  const [comic, setComic] = useState(initialComicState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setComic({...comic, [name]: value});
  };

  const saveComic = () => {
    const data = {
      artist: comic.artist,
      show_name: comic.show_name,
      year: comic.year,
      duration: comic.duration,
      show_url: comic.show_url,
    };

    ShowDataService.create(data)
      .then((response) => {
        setComic({
          id: response.data.id,
          artist: response.data.artist,
          show_name: response.data.show_name,
          year: response.data.year,
          duration: response.data.duration,
          show_url: response.data.show_url,
          favorites: response.data.favorites,
        });
        setSubmitted(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const newComic = () => {
    setComic(initialComicState);
    setSubmitted(false);
  };

  return (
    <ADD className="submit-form">
      {submitted ? (
        <div>
          <h4 className="success-title">Ajouté avec succès!</h4>
          <button className="btn btn-success" onClick={newComic}>
            Ajouter
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
          <h4 className="title">Spectacle à ajouter</h4>
            <label htmlFor="artist">Artiste</label>
            <input
              type="text"
              className="form-control"
              id="artist"
              required
              value={comic.artist}
              onChange={handleInputChange}
              name="artist"
            />
          </div>

          <div className="form-group">
            <label htmlFor="show_name">Nom du spectacle</label>
            <input
              type="text"
              className="form-control"
              id="show-name"
              required
              value={comic.show_name}
              onChange={handleInputChange}
              name="show_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="year">Année de sortie</label>
            <input
              type="text"
              className="form-control"
              id="year"
              required
              value={comic.year}
              onChange={handleInputChange}
              name="year"
            />
          </div>

          <div className="form-group">
            <label htmlFor="duration">Durée (en min)</label>
            <input
              type="text"
              className="form-control"
              id="duration"
              required
              value={comic.duration}
              onChange={handleInputChange}
              name="duration"
            />
          </div>

          <div className="form-group">
            <label htmlFor="show_url">Lien de la vidéo</label>
            <input
              type="url"
              className="form-control"
              id="showurl"
              required
              value={comic.show_url}
              onChange={handleInputChange}
              name="show_url"
            />
          </div>
          <br />
          <button onClick={saveComic} className="btn btn-success">
            Ajouter
          </button>
        </div>
      )}
      <br />
    </ADD>
  );
};

AddShow.propTypes = {
  id: PropTypes.number,
  artist: PropTypes.string,
  show_name: PropTypes.string,
  year: PropTypes.number,
  duration: PropTypes.number,
  favorites: PropTypes.bool,
  show_url: PropTypes.string
};


export default AddShow;
