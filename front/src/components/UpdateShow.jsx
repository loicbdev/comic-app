import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ShowDataService from "../services/ShowDataService";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const SHOW = styled.div`
  padding-top: 2rem;

  .edit-form {
    max-width: 300px;
    margin: auto;
  }

  .message {
    padding-top: 2rem;
    color: #900f0f;
  }
`;

const UpdateShow = (props) => {
  const initialComicState = {
    id: null,
    artist: "",
    show_name: "",
    year: "",
    duration: "",
    show_url: "",
    favorites: false,
  };

  const [currentComic, setCurrentComic] = useState(initialComicState);
  const [message, setMessage] = useState("");

  const getComic = (id) => {
    ShowDataService.get(id)
      .then((response) => {
        setCurrentComic(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getComic(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setCurrentComic({...currentComic, [name]: value});
  };

  const updateFavorites = (status) => {
    const data = {
      id: currentComic.id,
      artist: currentComic.artist,
      show_name: currentComic.show_name,
      year: currentComic.year,
      duration: currentComic.duration,
      show_url: currentComic.show_url,
      favorites: status,
    };

    ShowDataService.update(currentComic.id, data)
      .then(() => {
        setCurrentComic({...currentComic, favorites: status});
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const updateComic = () => {
    ShowDataService.update(currentComic.id, currentComic)
      .then(() => {
        setMessage("Le spectacle a été mis à jour!");
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const deleteComic = () => {
    ShowDataService.remove(currentComic.id)
      .then(() => {
        props.history.push("/shows");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SHOW>
      {
        <div className="edit-form">
          <h4 className="title">Spectacle à modifier</h4>
          <form>
            <div className="form-group">
              <label htmlFor="artist">Artiste</label>
              <input
                type="text"
                className="form-control"
                id="artist"
                name="artist"
                value={currentComic.artist}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="show_name">Nom du spectacle</label>
              <input
                type="text"
                className="form-control"
                id="show_name"
                name="show_name"
                value={currentComic.show_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Année de sortie</label>
              <input
                type="text"
                className="form-control"
                id="year"
                name="year"
                value={currentComic.year}
                onChange={handleInputChange}
              />
            </div>            
            <div className="form-group">
              <label htmlFor="duration">Durée (en min)</label>
              <input
                type="text"
                className="form-control"
                id="duration"
                name="duration"
                value={currentComic.duration}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="show_url">Lien</label>
              <input
                type="url"
                className="form-control"
                id="show_url"
                name="show_url"
                value={currentComic.show_url}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Avis :</strong>
              </label>{" "}
              {currentComic.favorites ? "top" : "pas top"}
            </div>
          </form>

          {currentComic.favorites ? (
            <button
              className="badge badge-warning mr-2"
              onClick={() => updateFavorites(false)}
            >
              Pas top
            </button>
          ) : (
            <button
              className="badge badge-success mr-2"
              onClick={() => updateFavorites(true)}
            >
              Top
            </button>
          )}

          <button className="badge badge-danger mr-2" onClick={deleteComic}>
            Supprimer
          </button>

          <button
            type="submit"
            className="badge badge-info"
            onClick={updateComic}
          >
            Mettre à jour
          </button>
          <p className="message">
            {message}
          </p>
        </div>
      }
    </SHOW>
  );
};

UpdateShow.propTypes = {
  id: PropTypes.number,
  artist: PropTypes.string,
  show_name: PropTypes.string,
  year: PropTypes.number,
  duration: PropTypes.number,
  favorites: PropTypes.bool,
  show_url: PropTypes.string
};

export default UpdateShow;
