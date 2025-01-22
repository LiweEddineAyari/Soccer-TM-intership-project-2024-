import React from 'react';
import logo1 from '../assets/images/logo_1.png'; // Adjust the path as necessary
import logo2 from '../assets/images/logo_2.png'; // Adjust the path as necessary

const ResultMatch = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="d-flex team-vs">
            <span className="score">4-1</span>
            <div className="team-1 w-50">
              <div className="team-details w-100 text-center">
                <img src={logo1} alt="LA LEGA Logo" className="img-fluid" />
                <h3>LA LEGA <span>(win)</span></h3>
                <ul className="list-unstyled">
                  <li>Anja Landry (7)</li>
                  <li>Eadie Salinas (12)</li>
                  <li>Ashton Allen (10)</li>
                  <li>Baxter Metcalfe (5)</li>
                </ul>
              </div>
            </div>
            <div className="team-2 w-50">
              <div className="team-details w-100 text-center">
                <img src={logo2} alt="JUVENDU Logo" className="img-fluid" />
                <h3>JUVENDU <span>(loss)</span></h3>
                <ul className="list-unstyled">
                  <li>Macauly Green (3)</li>
                  <li>Arham Stark (8)</li>
                  <li>Stephan Murillo (9)</li>
                  <li>Ned Ritter (5)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultMatch;
