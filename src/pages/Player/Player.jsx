import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useParams, useNavigate } from 'react-router-dom';

const Player = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Call useParams as a function to get the params
  console.log(id);

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzdmZjE0MDg4ZGZlZTY1YTk1YzNlMDlmZDk1MzMxNiIsIm5iZiI6MTcyNzQxNjU2Ni43OTMzMTQsInN1YiI6IjY2ZjY0NzBmYjlkNjdhYWRlYzUwOWMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CMPy1RivMX5hDRBHGp6O7l9XPoT5RbZYhIiSWv6JrxQ'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0]))
      .catch(err => console.error(err));
  }, [id]); // Add id to dependency array to refetch if id changes

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={() => { navigate(-2); }} />
      <iframe width='90%' height='90%'
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title='trailer' frameBorder="0"
        allowFullScreen></iframe>
      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
