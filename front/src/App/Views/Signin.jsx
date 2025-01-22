import React, { useState } from 'react'
import '../assets/css/bootstrap/bootstrap.css';
import '../assets/css/style.css';
import bgImage from '../assets/images/bg_3.jpg'; // Adjust the path as necessary
import Navbar from '../components/Navbar';
import { Button, Card, CardBody, CardText,CardFooter, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import {login} from '../../Services/UserApi'

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const userData = await login(email, password);
        localStorage.setItem('userLogged', JSON.stringify(userData));
        
        navigate('/'); 

    } catch (err) {
        console.error('Login failed:', err);
        setError('Login failed. Please check your credentials.');
    }
    };

    const handleSignupClick = () => {
        navigate('/signup');
      };

  return (
    <div className="site-wrap">
      <Navbar active="signin"/>
      <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-lg-5  ">
                <Col md="30">
                    <Card className="card-user">
                        <CardBody>
                            <CardText />
                            <div className="author">
                            <div className="block block-one" />
                            <div className="block block-two" />
                            <div className="block block-three" />
                            <div className="block block-four" />
                            </div>
                            <h5 className="title text-center text-black">Sign In</h5>
                            <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="form-controll"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{ color: 'black', textDecorationStyle: 'black' }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="form-controll"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ color: 'black', textDecorationStyle: 'black' }}
                                />
                            </FormGroup>
                            <Button type="submit" color="primary" >
                                Sign In
                            </Button>
                            <Button  color="primary" onClick={handleSignupClick} >
                                Sign Up
                            </Button>
                            </Form>
                        </CardBody>
                        <CardFooter>
                            <div className="button-container">
                            <Button className="btn-icon btn-round" color="facebook">
                                <i className="fab fa-facebook" />
                            </Button>
                            <Button className="btn-icon btn-round" color="twitter">
                                <i className="fab fa-twitter" />
                            </Button>
                            <Button className="btn-icon btn-round" color="google">
                                <i className="fab fa-google-plus" />
                            </Button>
                            </div>
                        </CardFooter>
                    </Card>
                 </Col>
                </div>
              </div>
            </div>
          </div>
      <br />
    </div>
  )
}
