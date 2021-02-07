import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ShowDataService from "../services/ShowDataService";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

const LIST = styled.div`
  padding-top: 2rem;
  text-align: left;
  max-width: 750px;
  margin: auto;

  .col-md-6 {
    padding-bottom: 5rem;
  }

  .col-md-8 {
    padding-bottom: 1rem;
  }

  .form-control {
    border-color: #900f0f;
  }

  .alert.alert-warning {
    font-size: 1rem;
    color: #d64747;
    text-align: center;
    font-weight: bold;
  }

  .list-group-item.active {
    background-color: #900f0f;
    border-color:#900f0f;
  }

  .m-3.btn.btn-sm.btn-info {
    background-color: #900f0f;
    border-color:#900f0f;
  }

  .title {
    padding-bottom: 1.5rem;
  }

  .btn.btn-outline-secondary {
    border-color: #900f0f;
  }
`;

const ShowsList = () => {
  const [shows, setShows] = useState([]);
  const [currentShow, setCurrentShow] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchArtist, setSearchArtist] = useState("");

  useEffect(() => {
    retrieveShows();
  }, []);

  const onChangeSearchArtist = (e) => {
    const searchArtist = e.target.value;
    setSearchArtist(searchArtist);
  };

  const retrieveShows = () => {
    ShowDataService.getAll()
      .then((response) => {
        setShows(response.data);
      })
      .catch((e) => {
        console.log(e);
      })
  };

  const refreshList = () => {
    retrieveShows();
    setCurrentShow(null);
    setCurrentIndex(-1);
  };

  const publishedTop = () => {
    ShowDataService.publishedTop()
      .then((response) => {
        setShows(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const setActiveShow = (show, index) => {
    setCurrentShow(show);
    setCurrentIndex(index);
  };

  const findByArtist = () => {
    ShowDataService.findByArtist(searchArtist)
      .then((response) => {
        setShows(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <LIST className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nom de l'artiste...?"
            value={searchArtist}
            onChange={onChangeSearchArtist}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByArtist}
            >
              GO
            </button>
          </div>
        </div>
        <div className="col-md-8">
          <button className="m-3 btn btn-sm btn-success" onClick={publishedTop}>
            au Top !
          </button>
        </div>
      </div>
      <div className="col-md-6">
        <h4 className="title">Liste des spectacles</h4>
        <ul className="list-group">
          {shows &&
            shows.map((comic, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveShow(comic, index)}
                key={index}
              >
                <h4>{comic.artist}</h4>
                <p>{comic.show_name}</p>
              </li>
            ))}
        </ul>

        <button className="m-3 btn btn-sm btn-info" onClick={refreshList}>
          Rafraîchir
        </button>
      </div>
      <div className="col-md-6">
        {currentShow ? (
          <div>
            <h4>Détail du spectacle</h4>
            <br />
            <div>
              <label>
                <strong>Artiste :</strong>
              </label>
              <br />
              {currentShow.artist}
            </div>
            <br />
            <div>
              <label>
                <strong>Nom du spectacle :</strong>
              </label>
              <br />
              {currentShow.show_name}
            </div>
            <br />
            <div>
              <label>
                <strong>Année de sortie : </strong> {currentShow.year}
              </label>
              <br />
            </div>
            <br />
            <div>
              <label>
                <strong>Durée (en min) : </strong>
                {currentShow.duration}
              </label>
              <br />
              
            </div>
            <br />
            <div>
              <label>
                <strong>Vidéo :</strong>
              </label>
              <br />
              <div className="player-wrapper">
                <ReactPlayer
                  url={currentShow.show_url}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
            <br />
            <div>
              <label>
                <strong>Avis :</strong>
              </label>{" "}
              {currentShow.favorites ? "top" : "pas top"}
            </div>
            <br />
            <Link
              to={"/shows/" + currentShow.id}
              className="badge badge-warning"
            >
              Modifier
            </Link>
          </div>
        ) : (
          <div className="alert alert-warning">
            Clic sur un spectacle pour avoir plus d&apos;infos...
          </div>
        )}
      </div>
    </LIST>
  );
};

ShowsList.propTypes = {
  id: PropTypes.number,
  artist: PropTypes.string,
  show_name: PropTypes.string,
  year: PropTypes.number,
  duration: PropTypes.number,
  favorites: PropTypes.bool,
  show_url: PropTypes.string,
  controls: PropTypes.bool
};

export default ShowsList;