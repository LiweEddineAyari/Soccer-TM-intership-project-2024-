import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/teamCard.css'; // Reuse the same CSS for consistent styling
import Image from './Image';

const TerrainCard = ({ imageSrc, name, location, prix, onClick }) => {

    return (
    <div className="col-lg-6 mb-4" onClick={onClick}>
      <div className="bg-light p-4 rounded team-card">
        <div className="widget-body">
          <div className="widget-vs">
            <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
              <div className="team-1 text-center">
                <Image imageSource={imageSrc} />
                <h3>{name}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center widget-vs-contents mb-4">
          <h4>{location}</h4>
          <p className="mb-5">
            <strong className="text-primary">{prix}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

TerrainCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  prix: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TerrainCard;
