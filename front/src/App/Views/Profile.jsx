import React, { useEffect, useRef, useState } from 'react';
import '../assets/css/bootstrap/bootstrap.css';
import '../assets/css/style.css';
import bgImage from '../assets/images/bg_3.jpg';
import Navbar from '../components/Navbar';
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, Col, Form, FormGroup, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { uploadUserImage, getSessionUser,updateUser, logoutUser } from '../../Services/UserApi';

export default function Profile() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const imageRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getSessionUser();

                // Assuming that `userData.data` is the correct object containing user details
                const user = userData.data.user;
                if (user) {
                    setUser(user);
                    setName(user.name || '');
                    setAge(user.age || '');
                    setEmail(user.email || '');
                    setRole(user.role || '');
                }
            } catch (err) {
                console.error('Failed to fetch user:', err);
            }
        };

        fetchUser();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await updateUser(user._id, { name, age, email, password });
            console.log('Profile updated:', updatedUser);
            alert('Profile updated successfully!');
    
            // Optionally, update the user state with the updated data
            setUser(updatedUser);
            setName(user.name || '');
            setAge(user.age || '');
            setEmail(user.email || '');
            setRole(user.role || '');
        } catch (error) {
            console.error('Failed to update profile:', error);
            alert('An error occurred while updating the profile.');
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);

            try {
                const response = await uploadUserImage(user._id, file);
                console.log('Image uploaded successfully:', response);

                const updatedUserData = await getSessionUser();
                setUser(updatedUserData.data.user);

                imageRef.current.src = `http://localhost:5000/${updatedUserData.data.user.image_user}`;
            } catch (err) {
                console.error('Error uploading image:', err);
            }
        }
    };

    const handleLogout = async () => {
        try {
          await logoutUser();
          navigate('/signin'); 
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

    return (
        <div className="site-wrap">
            <Navbar active="profile" />
            <div className="hero overlay" style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-12">
                            <Row>
                                <Col md="8">
                                    <Card style={{ color: 'white', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                                        <CardHeader>
                                            <h5 className="title" style={{ color: '#ba54f5' }}>Edit Profile</h5>
                                        </CardHeader>
                                        <CardBody>
                                            <Form onSubmit={handleSave}>
                                                <Row>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label style={{ color: '#ba54f5' }}>Name</label>
                                                            <input
                                                                value={name}
                                                                onChange={(e) => setName(e.target.value)}
                                                                placeholder="Name"
                                                                type="text"
                                                                className="form-controll"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label style={{ color: '#ba54f5' }}>Age</label>
                                                            <input
                                                                value={age}
                                                                onChange={(e) => setAge(e.target.value)}
                                                                placeholder="Age"
                                                                type="number"
                                                                className="form-controll"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label style={{ color: '#ba54f5' }}>Email address</label>
                                                            <input
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                placeholder="Email"
                                                                type="email"
                                                                className="form-controll"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="6">
                                                        <FormGroup>
                                                            <label style={{ color: '#ba54f5' }}>Password</label>
                                                            <input
                                                                value={password}
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                placeholder="Password"
                                                                type="password"
                                                                className="form-controll"
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Button className="btn-fill" color="primary" type="submit">
                                                    Save
                                                </Button>
                                            </Form>
                                        </CardBody>
                                    </Card>
                                </Col>

                                <Col md="4">
                                    <Card className="card-user" style={{ background: 'linear-gradient(to left bottom, rgb(225, 78, 202), rgb(186, 84, 245), rgb(225, 78, 202))', color: 'white', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                                        <CardBody>
                                            <CardText />
                                            <div className="author" style={{ position: 'relative' }}>
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="avatar"
                                                        ref={imageRef}
                                                        src={user && user.image_user ? `http://localhost:5000/${user.image_user}` : require("../assets/images/img_2.jpg")}
                                                        style={{ borderRadius: '50%', border: '2px solid white', width: '150px', height: '150px' }}
                                                    />
                                                    <h5 className="title" style={{ color: 'white' }}>{name}</h5>
                                                </a>
                                                <label htmlFor="file-upload" style={{ position: 'absolute', top: '110px', left: '100px', backgroundColor: '#52bfff', borderRadius: '50%', padding: '8px', cursor: 'pointer' }}>
                                                    <i className="fa fa-camera" style={{ color: 'white', fontSize: '16px' }} />
                                                    <input
                                                        id="file-upload"
                                                        type="file"
                                                        style={{ display: 'none' }}
                                                        onChange={handleImageChange}
                                                    />
                                                </label>
                                                <p className="description" style={{ color: 'white' }}>{role}</p>
                                            </div>
                                            <div className="card-description" style={{ color: 'white' }}>
                                                Welcome to your profile page. Here you can update your details and see your information.
                                            </div>
                                        </CardBody>
                                        
                                        <CardFooter>
                                            <div className="button-container">
                                                <Button className=" btn-round" color="info" onClick={handleLogout}>
                                                    Log Out
                                                </Button>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
