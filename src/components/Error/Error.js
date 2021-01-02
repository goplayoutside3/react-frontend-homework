import React from 'react';

const Error = ({ fetchHotelResults }) => {
  return (
    <div id="error-ui">
      <p>There was a problem fetching hotel data. Please try again.</p>
      <button className="button" onClick={fetchHotelResults}>Try Again</button>
    </div>
  )
}

export default Error;
