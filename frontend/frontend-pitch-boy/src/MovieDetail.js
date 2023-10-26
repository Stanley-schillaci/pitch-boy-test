import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [suggestedMovies, setSuggestedMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try
      {
        const apiKey = 'ad2c28e0345278f3c8b002efddadf28f';

        const response = await Axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
        setMovie(response.data);

        const suggestionsResponse = await Axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`);
        setSuggestedMovies(suggestionsResponse.data.results);
      }
      catch (error)
      {
        console.error('Erreur lors de la récupération des détails du film :', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className='main-content'>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>Vote moyen : {movie.vote_average}</p>

      <h3>Suggestions de films similaires :</h3>
      <ul>
        {suggestedMovies.map((suggestedMovie) => (
          <li key={suggestedMovie.id}>
            {suggestedMovie.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieDetail;
