import React, { useState } from 'react';
import './Hotel.style.scss';

const Hotel = ({ hotel }) => {
  const [imgSrc, setImgSrc] = useState(true);

  const {
    name = '',
    neighborhoodName = '',
    mainImage,
  } = hotel.hotelStaticContent;
  const { miles = '' } = hotel.rewards;
  const { amount = 0, symbol = '$' } = hotel.lowestAveragePrice;

  return (
    <div className="hotel-card" key={hotel.id}>
      <img
        src={mainImage.url}
        onError={() => setImgSrc(false)}
        style={{ display: 'none' }}
      />
      {imgSrc ? (
        <div
          className="image"
          style={{
            backgroundImage: `url(${mainImage.url})`,
          }}
        />
      ) : (
        <div
          className="image"
          style={{
            backgroundColor: '#ededed',
          }}
        >
          <p className="no-image">Image Coming Soon</p>
        </div>
      )}
      <div className="hotel-details">
        <div className="hotel-name">{name}</div>
        <div className="location">{neighborhoodName}</div>
      </div>
      <div className="price-details">
        <span className="price">
          <span
            dangerouslySetInnerHTML={{
              __html: symbol,
            }}
          ></span>
          {amount}
        </span>
        <span className="rewards">{miles} miles</span>
        <button className="button">Select</button>
      </div>
    </div>
  );
};

export default Hotel;
