import React from 'react';
import TerrainCard from './TerrainCard'; // Adjust the path as necessary

const TerrainSection = ({ onTerrainSelect }) => {
  const terrains = [
    {
      imageSrc: 'logo_2.png',
      name: 'Stadium A',
      location: 'City Center',
      prix: '$200/hour'
    },
    {
      imageSrc: 'logo_1.png',
      name: 'Stadium B',
      location: 'Downtown',
      prix: '$150/hour'
    },
    {
      imageSrc: 'logo_3.png',
      name: 'Stadium C',
      location: 'Suburb',
      prix: '$100/hour'
    },
    {
      imageSrc: 'logo_4.png',
      name: 'Stadium D',
      location: 'Uptown',
      prix: '$250/hour'
    }
  ];

  const handleTerrainClick = (terrainName) => {
    if (onTerrainSelect) {
      onTerrainSelect(terrainName);
    }
  };

  return (
    <div className="container">
      <br /><br />
      <div className="row">
        <div className="col-12 title-section">
          <h2 className="heading">Choose the Terrain for Your Match</h2>
        </div>
        {terrains.map((terrain, index) => (
          <TerrainCard
            key={index}
            imageSrc={terrain.imageSrc}
            name={terrain.name}
            location={terrain.location}
            prix={terrain.prix}
            onClick={() => handleTerrainClick(terrain.name)}
          />
        ))}
      </div>
    </div>
  );
};

export default TerrainSection;
