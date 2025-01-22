import React, { useState } from 'react';
import '../assets/css/bootstrap/bootstrap.css';
import '../assets/css/style.css';
import bgImage from '../assets/images/bg_3.jpg'; // Adjust the path as necessary
import Navbar from '../components/Navbar';
import { Button, Card, CardBody, CardText, CardFooter, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import { signUpUser } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';
export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign-up logic here
    console.log('Name:', name);
    console.log('Age:', age);
    console.log('Email:', email);
    console.log('Password:', password);

    try {
      const userData = { name, age, email, password };
      const response = await signUpUser(userData);
      console.log('User added:', response.AddedUser);
      navigate('/signin');

  } catch (err) {
      console.error('Failed to sign up:', err);
  }
  };

  return (
    <div className="site-wrap">
      <Navbar active="signup"/>
      <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})`, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container">
          <div className="row align-items-center  justify-content-center">
            <div className="col-lg-5">
              <Col md="12">
                <Card className="card-user">
                  <CardBody>
                    <CardText />
                    <div className="author">
                      <div className="block block-one" />
                      <div className="block block-two" />
                      <div className="block block-three" />
                      <div className="block block-four" />
                    </div>
                    <h5 className="title text-center text-black">Sign Up</h5>
                    <Form onSubmit={handleSubmit}>
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Enter your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="form-controll"

                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="age">Age</Label>
                        <input
                          type="number"
                          id="age"
                          placeholder="Enter your age"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          className="form-controll"

                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="form-controll"

                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <input
                          type="password"
                          id="password"
                          placeholder="Enter your password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="form-controll"
                        />
                      </FormGroup>
                      <Button type="submit" color="primary" block>
                        Sign Up
                      </Button>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <div className="button-container text-center">
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
  );
}
