import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  const [latestMovies, setLatestMovies] = useState([]);
  const [sortBy, setSortBy] = useState('release_date');

  useEffect(() => {
    const fetchLatestMovies = async () => {
      try 
      {
        const apiKey = 'ad2c28e0345278f3c8b002efddadf28f';
        const response = await Axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`);
        
        let sortedMovies = [...response.data.results];

        if (sortBy === 'title')
          sortedMovies = sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
        else
          sortedMovies = sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

        setLatestMovies(sortedMovies);
      } 
      catch (error)
      {
        console.error('Erreur lors de la récupération des derniers films :', error);
      }
    };

    fetchLatestMovies();
  }, [sortBy]);

  return (
    <div className='main-content'>
      <h1>Derniers films</h1>
      <div>
        <label>Trier par :</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="release_date">Date de sortie</option>
          <option value="title">Ordre alphabétique</option>
        </select>
      </div>
      <ul>
        {latestMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
