/*!

=========================================================
* Black Dashboard React v1.2.2
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useCallback, useEffect, useState } from "react";
import "../assets/css/style.css"
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  InputGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Badge,
} from "reactstrap";
import { getAllTerrains,DeleteTerrainById,addTerrain,getAllTerrainsByName,UpdateTerrainById } from "Services/TerrainApi";

function TerrainGestion() {



  //get terrains-------------------------------------------------------------------------------------------------------
  const [terrainList, setTerrainList] = useState([]);

  useEffect(() => {
    fetchTerrains();
  },[]);

  const fetchTerrains = useCallback(async () => {
      await getAllTerrains()
      .then((res)=>{
        console.log(res);
        setTerrainList(res.data.terrains)
      })
      .catch((err)=> console.log('ErrorGetTerrainsList :',err))
  })





  //search-----------------------------------------------------------------------------------------------------------------
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      try {
        const response = await getAllTerrainsByName(value); // Fetch terrains by name
        setTerrainList(response.data.terrains);
      } catch (err) {
        console.log('ErrorGetTerrainsListSearch:', err);
      }
    } else {
      fetchTerrains(); // If search term is empty, fetch all terrains
    }
  };







//modal add------------------------------------------------------------------------------------------------------------------
  const [modal, setModal] = useState(false);
  const [newTerrain, setNewTerrain] = useState({
    name: '',
    location: '',
    image: 'terrain.png',
    Prix_Reservation: 0
  });

  const toggleModal = () => setModal(!modal);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewTerrain({ ...newTerrain, [name]: files[0] });
    } else {
      setNewTerrain({ ...newTerrain, [name]: value });
    }
  };







//add terain-----------------------------------------------------------------------------------------------------------------
  const handleAddNewTerrain = async () => {
    console.log('New terrain details:', newTerrain);
    // Add your logic to save the new terrain details

    const formData = new FormData();
    formData.append("name", newTerrain.name);
    formData.append("location", newTerrain.location);
    formData.append("Prix_Reservation", newTerrain.Prix_Reservation);
    formData.append("image", newTerrain.image);
    console.log('formData details:', formData);

    toggleModal();

    try {
      await addTerrain(formData);
      console.log('New terrain added successfully.');
      await fetchTerrains();
      toggleModal(); // Close the modal after adding
    } catch (err) {
      console.log('Error adding new terrain:', err);
    }
  };




//delete terrain------------------------------------------------------------------------------------------------------------
const handleDeleteTerrain = async (id) => {
  try {
    await DeleteTerrainById(id);
    // Optionally, refetch the terrains or update the local state
    setTerrainList((prevList) => prevList.filter(terrain => terrain._id !== id));
    console.log(`Terrain with id ${id} deleted successfully.`);
  } catch (err) {
    console.log('Error deleting terrain:', err);
  }

};




//update terrain------------------------------------------------------------------------------------------------------------

const [updateModal, setUpdateModal] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState({
    name: '',
    location: '',
    Prix_Reservation: '',
    image: null,
  });

  const toggleUpdateModal = () => setUpdateModal(!updateModal);

  const handleUpdateInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setSelectedTerrain({ ...selectedTerrain, [name]: files[0] });
    } else {
      setSelectedTerrain({ ...selectedTerrain, [name]: value });
    }

  };

  const handleUpdateTerrain = async () => {
    const formDataU = new FormData();
    formDataU.append('name', selectedTerrain.name);
    formDataU.append('location', selectedTerrain.location);
    formDataU.append('Prix_Reservation', selectedTerrain.Prix_Reservation);
    if (selectedTerrain.image) {
      formDataU.append('image', selectedTerrain.image);
    }

    try {

      await UpdateTerrainById(selectedTerrain._id, formDataU); // Implement this function to call your API
      // Refresh terrain list or update state here
      toggleUpdateModal(); // Close the modal
      fetchTerrains();

    } catch (err) {
      console.error('Error updating terrain:', err);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
                <CardHeader>
                      <h2 className="title" style={{color:'#52bfff'}} >Terrains List</h2>
                      <p className="category" style={{color:'#ba54f5'}}>Here is a subtitle for this table</p>
                      <InputGroup >
                      <InputGroupAddon addonType="prepend" style={{border:'1px solid #ba54f5',borderLeft:'1px solid #ba54f5',borderRight:'none',color:'#ba54f5',borderRadius:'5px'}}>
                        <InputGroupText > <i className="fas fa-search" style={{border:'#ba54f5',color:'#ba54f5'}}></i></InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Search..."
                        className="form-control"
                        style={{
                          color: "black",
                          width: '400px',
                          border: '1px solid #ba54f5',
                          borderLeft: 'none'
                        }}
                        value={searchTerm}
                        onChange={handleSearchChange} // Attach the change handler
                      />
                    </InputGroup> 
                    <InputGroupAddon>
                        <Button color="success" onClick={toggleModal}   >
                          <i className="fas fa-plus"></i>
                        </Button>
                        <Button color="success"    >
                          Clear List
                        </Button>
                    </InputGroupAddon>
                </CardHeader>
              <CardBody>
              <Table responsive>
                  <thead>
                      <tr>
                          <th className="text-center">#</th>
                          <th className="text-center">image</th>
                          <th className="text-center">Name</th>
                          <th className="text-center">prix</th>
                          <th className="text-center">Location</th>
                          <th className="text-center">Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                  {terrainList.map((terrain, index) => (
                      <tr key={terrain._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          {/* Display the terrain image */}
                          <img
                            src={`http://localhost:5000/${terrain.image}`} // Adjust the path as needed
                            alt={terrain.name} // Provide alt text for accessibility
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Style the image
                          />
                        </td>
                        <td className="text-center">{terrain.name}</td>
                        <td className="text-center">€ {terrain.Prix_Reservation}</td>
                        <td className="text-center">{terrain.location}</td>
                        <td className="text-center">
                          <Button className="btn-icon" color="success" size="sm" onClick={() => {
                              setSelectedTerrain(terrain); // Set the selected terrain data for updating
                              toggleUpdateModal(); // Open the update modal}
                          }}>
                              <i className="fa fa-edit"></i>
                          </Button>{' '}
                          <Button className="btn-icon" color="danger" size="sm" onClick={() => handleDeleteTerrain(terrain._id)}>
                            <i className="fa fa-times" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
              </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={modal} toggle={toggleModal}  >
            <ModalHeader toggle={toggleModal}>Add New Terrain</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label for="name">Name</Label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={newTerrain.name}
                    onChange={handleInputChange}
                    className="form-controll"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="location">Location</Label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={newTerrain.location}
                    onChange={handleInputChange}
                    className="form-controll"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="Prix_Reservation">Prix Reservation</Label>
                  <input
                    type="number"
                    id="Prix_Reservation"
                    name="Prix_Reservation"
                    value={newTerrain.Prix_Reservation}
                    onChange={handleInputChange}
                    className="form-controll"
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="image"> <Badge color="primary"  style={{fontSize:'15px'}}>Chose An Image</Badge></Label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-controll"
                    onChange={handleInputChange}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleAddNewTerrain}>Add Terrain</Button>{' '}
              <Button color="secondary" onClick={toggleModal}>Cancel</Button>
            </ModalFooter>
        </Modal>


        <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
          <ModalHeader toggle={toggleUpdateModal}>Update Terrain</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="name">Name</Label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={selectedTerrain.name}
                  onChange={handleUpdateInputChange}
                  className="form-controll"
                />
              </FormGroup>
              <FormGroup>
                <Label for="location">Location</Label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={selectedTerrain.location}
                  onChange={handleUpdateInputChange}
                  className="form-controll"
                />
              </FormGroup>
              <FormGroup>
                <Label for="Prix_Reservation">Prix Reservation</Label>
                <input
                  type="number"
                  id="Prix_Reservation"
                  name="Prix_Reservation"
                  value={selectedTerrain.Prix_Reservation}
                  onChange={handleUpdateInputChange}
                  className="form-controll"
                />
              </FormGroup>
              <FormGroup>
                <Label for="image">
                  <Badge color="primary" style={{ fontSize: '15px' }}>Choose An Image</Badge>
                </Label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-controll"
                  onChange={handleUpdateInputChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleUpdateTerrain}>Update Terrain</Button>{' '}
            <Button color="secondary" onClick={toggleUpdateModal}>Cancel</Button>
          </ModalFooter>
      </Modal>
      </div>
    </>
  );
}

export default TerrainGestion;
