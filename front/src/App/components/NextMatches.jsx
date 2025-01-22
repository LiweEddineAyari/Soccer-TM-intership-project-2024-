import React from 'react';
import logo1 from '../assets/images/logo_1.png'; // Update with actual path
import logo2 from '../assets/images/logo_2.png'; // Update with actual path
import logo3 from '../assets/images/logo_3.png'; // Update with actual path
import logo4 from '../assets/images/logo_4.png'; // Update with actual path

const NextMatches = () => {
  return (
    <div className="site-section bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-12 title-section">
            <h2 className="heading">Upcoming Matches</h2>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="bg-light p-4 rounded">
              <div className="widget-body">
                <div className="widget-vs">
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <img src={logo1} alt="Football League Logo" />
                      <h3>Football League</h3>
                    </div>
                    <div>
                      <span className="vs"><span>VS</span></span>
                    </div>
                    <div className="team-2 text-center">
                      <img src={logo2} alt="Soccer Logo" />
                      <h3>Soccer</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center widget-vs-contents mb-4">
                <h4>World Cup League</h4>
                <p className="mb-5">
                  <span className="d-block">December 20th, 2020</span>
                  <span className="d-block">9:30 AM GMT+0</span>
                  <strong className="text-primary">New Euro Arena</strong>
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="bg-light p-4 rounded">
              <div className="widget-body">
                <div className="widget-vs">
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <img src={logo3} alt="Football League Logo" />
                      <h3>Football League</h3>
                    </div>
                    <div>
                      <span className="vs"><span>VS</span></span>
                    </div>
                    <div className="team-2 text-center">
                      <img src={logo4} alt="Soccer Logo" />
                      <h3>Soccer</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center widget-vs-contents mb-4">
                <h4>World Cup League</h4>
                <p className="mb-5">
                  <span className="d-block">December 20th, 2020</span>
                  <span className="d-block">9:30 AM GMT+0</span>
                  <strong className="text-primary">New Euro Arena</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="bg-light p-4 rounded">
              <div className="widget-body">
                <div className="widget-vs">
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <img src={logo1} alt="Football League Logo" />
                      <h3>Football League</h3>
                    </div>
                    <div>
                      <span className="vs"><span>VS</span></span>
                    </div>
                    <div className="team-2 text-center">
                      <img src={logo2} alt="Soccer Logo" />
                      <h3>Soccer</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center widget-vs-contents mb-4">
                <h4>World Cup League</h4>
                <p className="mb-5">
                  <span className="d-block">December 20th, 2020</span>
                  <span className="d-block">9:30 AM GMT+0</span>
                  <strong className="text-primary">New Euro Arena</strong>
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-4">
            <div className="bg-light p-4 rounded">
              <div className="widget-body">
                <div className="widget-vs">
                  <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                    <div className="team-1 text-center">
                      <img src={logo3} alt="Football League Logo" />
                      <h3>Football League</h3>
                    </div>
                    <div>
                      <span className="vs"><span>VS</span></span>
                    </div>
                    <div className="team-2 text-center">
                      <img src={logo4} alt="Soccer Logo" />
                      <h3>Soccer</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center widget-vs-contents mb-4">
                <h4>World Cup League</h4>
                <p className="mb-5">
                  <span className="d-block">December 20th, 2020</span>
                  <span className="d-block">9:30 AM GMT+0</span>
                  <strong className="text-primary">New Euro Arena</strong>
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default NextMatches;
