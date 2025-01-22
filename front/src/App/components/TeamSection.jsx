import React from 'react';
import TeamCard from './TeamCard'; // Adjust the path as necessary

const TeamSection = ({ onTeamSelect }) => {
  const teams = [
    {
      logoSrc: 'logo_1.png',
      teamName: 'team 1',
      leagueName: 'World Cup League',
      matchDate: 'December 20th, 2020',
      matchTime: '9:30 AM GMT+0',
      venue: 'New Euro Arena'
    },
    {
      logoSrc: 'logo_1.png',
      teamName: 'Football League',
      leagueName: 'World Cup League',
      matchDate: 'December 20th, 2020',
      matchTime: '9:30 AM GMT+0',
      venue: 'New Euro Arena'
    },
    {
      logoSrc: 'logo_1.png',
      teamName: 'Football League',
      leagueName: 'World Cup League',
      matchDate: 'December 20th, 2020',
      matchTime: '9:30 AM GMT+0',
      venue: 'New Euro Arena'
    },
    {
      logoSrc: 'logo_1.png',
      teamName: 'Football League',
      leagueName: 'World Cup League',
      matchDate: 'December 20th, 2020',
      matchTime: '9:30 AM GMT+0',
      venue: 'New Euro Arena'
    }
  ];
  const handleTeamClick = (teamName) => {
    if (onTeamSelect) {
      onTeamSelect(teamName);
    }
  };
  return (

    <div className="container">
        <br /><br />
      <div className="row">
        <div className="col-12 title-section">
          <h2 className="heading">My Teams</h2>
        </div>
        {teams.map((team, index) => (
          <TeamCard
            key={index}
            logoSrc={team.logoSrc}
            teamName={team.teamName}
            leagueName={team.leagueName}
            matchDate={team.matchDate}
            matchTime={team.matchTime}
            venue={team.venue}
            onClick={() => handleTeamClick(team.teamName)}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
