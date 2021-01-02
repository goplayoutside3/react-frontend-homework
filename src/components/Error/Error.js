import React from 'react';

const Error = ({ sortByRecommended }) => {
  return (
    <div id="error-ui">
      <p>There was a problem fetching hotel data. Please try again.</p>
      <button className="button" onClick={sortByRecommended}>Try Again</button>
    </div>
  )
}

export default Error;
