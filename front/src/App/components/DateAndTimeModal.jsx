// DateAndTimeModal.jsx
import React, { useState } from 'react';
import '../assets/css/modal.css'; // Make sure to create this CSS file
import { UncontrolledAlert } from 'reactstrap';

const DateAndTimeModal = ({ show, handleClose , setDescription,setTitle}) => {
  const [matchDate, setMatchDate] = useState('');
  const [matchTime, setMatchTime] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const occupiedTimes = [
    { date: '2024-07-24', time: '10:00' },
    { date: '2024-07-25', time: '14:00' },
    // Add more occupied times as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const isOccupied = occupiedTimes.some(
      (occupied) => occupied.date === matchDate && occupied.time === matchTime
    );

    if (isOccupied) {
      setErrorMessage('The selected time is already occupied.');
    }
    else if(!matchDate || !matchTime) {
      setErrorMessage('Please choose both a date and a time.');
    }
    else{
      console.log('Selected date and time:', matchDate, matchTime);
      handleClose(); // Close the modal if no conflict
      setDescription("Successfully Match selected , Welcome anytime you want !");
      setTitle("Match Selected")
    }
  };

  if(!show) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>×</button>
        <h2 className="modal-title">Choose Date and Time</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="matchDate">Match Date</label>
            <input
              type="date"
              id="matchDate"
              className="form-controll"
              value={matchDate}
              onChange={(e) => setMatchDate(e.target.value)}
              style={{ color: 'black', textDecorationStyle: 'black' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="matchTime">Match Time</label>
            <input
              type="time"
              id="matchTime"
              className="form-controll"
              value={matchTime}
              onChange={(e) => setMatchTime(e.target.value)}
              style={{ color: 'black', textDecorationStyle: 'black' }}
            />
          </div>
          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DateAndTimeModal;
