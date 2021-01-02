import React, { useState, useEffect } from 'react';
import './App.style.scss';

import hotelResultService from '../../services/hotel-result/hotel-result.service';

import Error from '../Error/Error';
import Hotel from '../Hotel/Hotel';

const App = () => {
  const [fetchedHotels, setFetchedHotels] = useState([]);
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [serverError, setError] = useState(false);

  useEffect(() => {
    hotelResultService
      .get()
      .then((response) => {
        setFetchedHotels(response.results.hotels);
        setDisplayedHotels(response.results.hotels);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      });
  }, []);

  return (
    <div className="app-container">
      <div className="content">
        <div>
          <div className="filters">
            Hotel name
            <input type="text" className="input" maxLength={1} />
            Price
            <select name="" className="select">
              <option value="">Recommended</option>
              <option value="">Price low-to-high</option>
              <option value="">Price high-to-low</option>
            </select>
            <button className="button">Reset</button>
          </div>
        </div>

        {serverError ? (
          <Error />
        ) : (
          <div className="hotel-list">
            {displayedHotels.length ? (
              displayedHotels.map((hotel) => (
                <Hotel hotel={hotel} key={hotel.id} />
              ))
            ) : (
              <div>
                <p>No results found.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
