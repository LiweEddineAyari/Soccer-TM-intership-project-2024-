import React from 'react'
import Navbar from '../components/Navbar'
// Import CSS files
import '../assets/css/bootstrap/bootstrap.css';
import '../assets/css/style.css';
import bgImage from '../assets/images/bg_3.jpg'; // Adjust the path as necessary
import Footer from '../components/Footer';
import LatestNews from '../components/LastestNews';
import ResultMatch from '../components/ResultMatch';
import OurBlog from '../components/OurBlog';
import NextMatches from '../components/NextMatches';
import NextMatch from '../components/NextMatch';
export default function Matches() {
  return (
    <div className='site-wrap'>
          <Navbar active="matches"/> 
          <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5 ml-auto">
                  <h1 className="text-white">Matches</h1>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, molestias repudiandae pariatur.</p>
                </div>
              </div>
            </div>
          </div>
          <ResultMatch/>
          <NextMatch/>
          <NextMatches/>
          <OurBlog/>
        <Footer/> 

    </div>
  )
}
