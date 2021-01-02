import React, { useState, useEffect } from 'react';
import './App.style.scss';

import hotelResultService from '../../services/hotel-result/hotel-result.service';

import Error from '../Error/Error';
import Hotel from '../Hotel/Hotel';

const App = () => {
  const [fetchedHotels, setFetchedHotels] = useState([]);
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [serverError, setError] = useState(false);
  const [sortedBy, setSortedBy] = useState('recommended');
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    const filteredList = fetchedHotels.filter((hotel) => {
      return (
        hotel.hotelStaticContent.name
          .toLowerCase()
          .search(searchTerm.toLowerCase()) !== -1
      );
    });

    if (sortedBy === 'recommended') setDisplayedHotels(filteredList);

    if (sortedBy === 'ascending') {
      const sortedList = filteredList.sort(
        (a, b) => a.lowestAveragePrice.amount - b.lowestAveragePrice.amount
      );
      setDisplayedHotels(sortedList);
    } else if (sortedBy === 'descending') {
      const sortedList = filteredList.sort(
        (a, b) => b.lowestAveragePrice.amount - a.lowestAveragePrice.amount
      );
      setDisplayedHotels(sortedList);
    }
  }, [searchTerm, sortedBy]);

  const resetHotelResults = () => {
    setSearchTerm('');
    setDisplayedHotels(fetchedHotels.slice());
    setSortedBy('recommended');
  };

  return (
    <div className="app-container">
      <div className="content">
        <div>
          <div className="filters">
            <label>Hotel name</label>
            <input
              id="name-search-input"
              type="text"
              className="input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <label>Sort By Price</label>
            <select
              id="sorting-dropdown"
              name=""
              className="select"
              onChange={(e) => setSortedBy(e.target.value)}
            >
              <option value="recommended">Recommended</option>
              <option value="ascending">Price low-to-high</option>
              <option value="descending">Price high-to-low</option>
            </select>
            <button
              id="reset-button"
              className="button"
              onClick={resetHotelResults}
            >
              Reset
            </button>
          </div>
        </div>

        {serverError ? (
          <Error resetHotelResults={resetHotelResults}/>
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
