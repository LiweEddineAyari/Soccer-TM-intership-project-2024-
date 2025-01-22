import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import '../assets/css/bootstrap/bootstrap.css';
import '../assets/css/style.css';
import bgImage from '../assets/images/bg_3.jpg';
import Footer from '../components/Footer';
import LatestNews from '../components/LastestNews';
import ResultMatch from '../components/ResultMatch';
import OurBlog from '../components/OurBlog';
import NextMatches from '../components/NextMatches';
import NextMatch from '../components/NextMatch';
import TeamSection from '../components/TeamSection';
import Modal from '../components/Modal';
import TeamSection2 from '../components/TeamSection2';
import TerrainSection from '../components/TerrainSection';
import DateAndTimeModal from '../components/DateAndTimeModal';

export default function SelectMatches() {
  
  const [isModalVisible, setModalVisible] = useState(false);
  const [isTeamSectionVisible, setTeamSectionVisible] = useState(false);
  const [isTeamSectionVisible2, setTeamSectionVisible2] = useState(false);
  const [isTerrainSectionVisible, setTerrainSectionVisible] = useState(false);
  const [teamActionbtnsVisible, setteamActionbtnsVisible] = useState(true);
  const [isDateModalVisible, setDateModalVisible] = useState(false);


  const [Title, setTitle] = useState("Select Match");

  const [Description, setDescription] = useState('Choose your match from the list below and set the date and time. Make sure to select a time that works for you, and avoid conflicts with other scheduled matches.');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedTeam2, setSelectedTeam2] = useState(null);
  const [selectedTerrain, setSelectedTerrain] = useState(null);

  // References
  const teamSectionRef = useRef(null);
  const teamSectionRef2 = useRef(null);
  const terrainSectionRef = useRef(null);
  const teamActionbtns = useRef(null);

  // Modals close and open functions
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleOpenDateModal = () => setDateModalVisible(true);
  const handleCloseDateModal = () => setDateModalVisible(false);

  // Handle actions functions
  const handleSelectTeamClick = (e) => {
    setTeamSectionVisible(true);
    e.preventDefault();
    if (teamSectionRef.current) {
      teamSectionRef.current.scrollIntoView({ behavior: 'smooth' });
      setteamActionbtnsVisible(false);
    }
  };

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
    setTeamSectionVisible(false);
    setTeamSectionVisible2(true);
    if (teamSectionRef2.current) {
      teamSectionRef2.current.scrollIntoView({ behavior: 'smooth' });
    }
    console.log(`Selected team: ${team}`);
    setteamActionbtnsVisible(false);

  };

  const handleTeamSelect2 = (team) => {
    setSelectedTeam2(team);
    setTeamSectionVisible2(false);
    console.log(`Selected team 2: ${team}`);

    setTerrainSectionVisible(true);
    if (terrainSectionRef.current) {
      terrainSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTerrainSelect = (terrainName) => {
    if (teamActionbtns.current) {
      teamActionbtns.current.scrollIntoView({ behavior: 'smooth' });
    }
    setSelectedTerrain(terrainName);
    setTerrainSectionVisible(false);
    setDateModalVisible(true);
    console.log(`Selected terrain: ${terrainName}`);


  };
  console.log('DateModal:',isDateModalVisible );

  return (
    <div className='site-wrap'>
      <Navbar active="selectmatches" />
      <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 ml-auto">
              <h1 className="text-white">{Title}</h1>
              <p>{Description}.</p>
              {teamActionbtnsVisible &&       
                <p ref={teamActionbtns}>
                  <a href="#" className="btn btn-primary py-3 px-4 mr-3 animation-on-hover" style={{border:0}}  onClick={handleOpenModal}>Make New Team</a>
                  <a href="#" className="more light " onClick={handleSelectTeamClick}>Select Team</a>
                </p>  
              }
            </div>
          </div>
        </div>
      </div>
      <DateAndTimeModal show={isDateModalVisible} handleClose={handleCloseDateModal} setDescription={setDescription} setTitle={setTitle} />
      <Modal show={isModalVisible} handleClose={handleCloseModal} onSelectTeam={handleTeamSelect} />
      {isTeamSectionVisible &&       
        <div ref={teamSectionRef}>
          <TeamSection onTeamSelect={handleTeamSelect} />
        </div> 
      }
      {isTeamSectionVisible2 &&       
        <div ref={teamSectionRef2}>
          <TeamSection2 onTeamSelect={handleTeamSelect2} />
        </div> 
      }
      {isTerrainSectionVisible &&       
        <div ref={terrainSectionRef}>
          <TerrainSection onTerrainSelect={handleTerrainSelect} />
        </div>
      }
      <Footer />
    </div>
  );
}
