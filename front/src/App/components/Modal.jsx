// Modal.jsx
import React, { useState } from 'react';
import '../assets/css/modal.css'; // Make sure to create this CSS file

const Modal = ({ show, handleClose, onSelectTeam }) => {
  const [teamName, setTeamName] = useState('');

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName) {
      onSelectTeam(teamName); // Pass the team name to the parent
      setTeamName(''); // Clear the input field
      handleClose(); // Close the modal
    }
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>×</button>
        <h2 className="modal-title">New Team</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="teamName">Team Name</label>
            <input
              type="text"
              id="teamName"
              className="form-controll"
              placeholder="Enter team name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              style={{ color: 'black', textDecorationStyle: 'black' }}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
