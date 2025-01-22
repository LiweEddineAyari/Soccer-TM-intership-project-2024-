import React, { useEffect, useState } from 'react'

import Navbar from '../components/Navbar'
// Import CSS files
import '../assets/css/bootstrap/bootstrap.css';
import '../assets/css/style.css';
import bgImage from '../assets/images/bg_3.jpg'; // Adjust the path as necessary
import Footer from '../components/Footer';
import LatestNews from '../components/LastestNews';
import NextMatch from '../components/NextMatch';
import ResultMatch from '../components/ResultMatch';
import OurBlog from '../components/OurBlog';
import { getSessionUser } from '../../Services/UserApi';


export default function Home() {


  return (
    <div className='site-wrap'>
          <Navbar active="home"/> 
          <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 ml-auto">
                  <h1 className="text-white">World Cup Event</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, molestias repudiandae pariatur.</p>
                  <div id="date-countdown"></div>
                  <p>
                    <a href="/" className="btn btn-primary py-3 px-4 mr-3" style={{border:0}}>Book Ticket</a>
                    <a href="/" className="more light">Learn More</a>
                  </p>  
                </div>
              </div>
            </div>
          </div>
          <ResultMatch/>
          <LatestNews/>
          <NextMatch/>
          <OurBlog/>
        <Footer/> 

    </div>
  )
}
