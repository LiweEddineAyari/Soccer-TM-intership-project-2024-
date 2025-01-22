import React from 'react'
import '../assets/css/bootstrap/bootstrap.css';
import '../assets/css/style.css';
import bgImage from '../assets/images/bg_3.jpg'; // Adjust the path as necessary
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="site-wrap">
      <Navbar active="contact"/>
      <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 ml-auto">
                  <h1 className="text-white">Contact Us</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, molestias repudiandae pariatur.</p>  
                </div>
              </div>
            </div>
          </div>
      <br />
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <form action="#">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Email" />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Subject" />
              </div>
              <div className="form-group">
                <textarea className="form-control" cols="30" rows="10" placeholder="Write something..."></textarea>
              </div>
              <div className="form-group">
                <input type="submit" className="btn btn-primary py-3 px-5" value="Send Message" />
              </div>
            </form>  
          </div>
          <div className="col-lg-4 ml-auto">
            <ul className="list-unstyled">
              <li className="mb-2">
                <strong className="text-white d-block">Address</strong>
                273 South Riverview Rd. <br /> New York, NY 10011
              </li>
              <li className="mb-2">
                <strong className="text-white d-block">Email</strong>
                <a href="#">ayariliwa66@gmail.com</a>
              </li>
              <li className="mb-2">
                <strong className="text-white d-block">Phone</strong>
                <a href="#">+12 345 6789 012</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
