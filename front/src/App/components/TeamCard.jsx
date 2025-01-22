import React from 'react';
import PropTypes from 'prop-types';
import '../assets/css/teamCard.css'
import Image from './Image';
const TeamCard = ({ logoSrc, teamName, leagueName, matchDate, matchTime, venue ,onClick}) => {


  return (
    <div className="col-lg-6 mb-4" onClick={onClick}>
      <div className="bg-light p-4 rounded team-card">
        <div className="widget-body">
          <div className="widget-vs">
            <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
              <div className="team-1 text-center">
              <Image imageSource={logoSrc} />
                <h3>{teamName}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center widget-vs-contents mb-4">
          <h4>{leagueName}</h4>
          <p className="mb-5">
            <span className="d-block">{matchDate}</span>
            <span className="d-block">{matchTime}</span>
            <strong className="text-primary">{venue}</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

TeamCard.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired,
  leagueName: PropTypes.string.isRequired,
  matchDate: PropTypes.string.isRequired,
  matchTime: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired,
};

export default TeamCard;
