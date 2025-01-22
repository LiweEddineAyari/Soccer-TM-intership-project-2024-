import React, { useCallback, useEffect, useState } from "react";
import "../assets/css/style.css";

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
import { getAllEquipes, deleteEquipeById, getAllEquipesByName,updateEquipeNbrLoses,updateEquipeNbrWins } from "Services/EquipeApi";

function EquipeGestion() {
  // Get equipes
  const [equipeList, setEquipeList] = useState([]);

  useEffect(() => {
    fetchEquipes();
  }, []);

  const fetchEquipes = useCallback(async () => {
    await getAllEquipes()
      .then((res) => {
        console.log(res);
        setEquipeList(res.data.equipes);
      })
      .catch((err) => console.log('ErrorGetEquipeList:', err));
  });

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await getAllEquipesByName(value); // Fetch equipes by name
        setEquipeList(response.data.equipes);
      } catch (err) {
        console.log('ErrorGetEquipeListSearch:', err);
      }
    } else {
      fetchEquipes(); // If search term is empty, fetch all equipes
    }
  };

  // Delete equipe
  const handleDeleteEquipe = async (id) => {
    try {
      await deleteEquipeById(id);
      // Optionally, refetch the equipes or update the local state
      setEquipeList((prevList) => prevList.filter(equipe => equipe._id !== id));
      console.log(`Equipe with id ${id} deleted successfully.`);
    } catch (err) {
      console.log('Error deleting equipe:', err);
    }
  };

  //update Equipe 
  // State for modals and selected equipe
  const [isWinsModalOpen, setIsWinsModalOpen] = useState(false);
  const [isLosesModalOpen, setIsLosesModalOpen] = useState(false);
  const [selectedEquipe, setSelectedEquipe] = useState(null);
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);

  const toggleWinsModal = () => setIsWinsModalOpen(!isWinsModalOpen);
  const toggleLosesModal = () => setIsLosesModalOpen(!isLosesModalOpen);

  const handleWinsChange = (e) => setWins(e.target.value);
  const handleLosesChange = (e) => setLoses(e.target.value);

  const handleUpdateWins = async () => {
    try {
      await updateEquipeNbrWins(selectedEquipe._id, { nbr_wins: wins });
      fetchEquipes();
      toggleWinsModal();
    } catch (err) {
      console.log('Error updating wins:', err);
    }
  };

  const handleUpdateLoses = async () => {
    try {
      await updateEquipeNbrLoses(selectedEquipe._id, { nbr_loses: loses });
      fetchEquipes();
      toggleLosesModal();
    } catch (err) {
      console.log('Error updating loses:', err);
    }
  };


  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <h2 className="title" style={{ color: '#52bfff' }}>Equipes List</h2>
                <p className="category" style={{ color: '#ba54f5' }}>Here is a subtitle for this table</p>
                <InputGroup>
                  <InputGroupAddon addonType="prepend" style={{ border: '1px solid #ba54f5', borderLeft: '1px solid #ba54f5', borderRight: 'none', color: '#ba54f5', borderRadius: '5px' }}>
                    <InputGroupText> <i className="fas fa-search" style={{ border: '#ba54f5', color: '#ba54f5' }}></i></InputGroupText>
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
                  <Button color="success">
                    Clear List
                  </Button>
                </InputGroupAddon>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Creator</th>
                      <th className="text-center">Number of Wins</th>
                      <th className="text-center">Number of Losses</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {equipeList.map((equipe, index) => (
                      <tr key={equipe._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{equipe.name}</td>
                        <td className="text-center">{equipe.creator.name}</td>
                        <td className="text-center">{equipe.nbr_wins}</td>
                        <td className="text-center">{equipe.nbr_loses}</td>
                        <td className="text-center">
                        <Button className="btn-icon" color="success" size="sm" onClick={() => {
                              setSelectedEquipe(equipe);
                              setWins(equipe.nbr_wins);
                              toggleWinsModal();
                          }}>
                             <i className="fa fa-trophy" style={{ color: "gold" }} />
                          </Button>{' '}
                          <Button className="btn-icon" color="success" size="sm" onClick={() => {
                              setSelectedEquipe(equipe);
                              setLoses(equipe.nbr_loses);
                              toggleLosesModal();
                          }}>
                            <i className="fa fa-thumbs-down" style={{ color: "red" }} />
                          </Button>{' '}
                          <Button className="btn-icon" color="danger" size="sm" onClick={() => handleDeleteEquipe(equipe._id)}>
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
 {/* Update Wins Modal */}
      <Modal isOpen={isWinsModalOpen} toggle={toggleWinsModal}>
        <ModalHeader toggle={toggleWinsModal}>Update Wins</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="wins">Wins</Label>
              <input
                type="number"
                id="wins"
                value={wins}
                onChange={handleWinsChange}
                className="form-controll"

              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateWins}>Update</Button>{' '}
          <Button color="secondary" onClick={toggleWinsModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Update Loses Modal */}
      <Modal isOpen={isLosesModalOpen} toggle={toggleLosesModal}>
        <ModalHeader toggle={toggleLosesModal}>Update Loses</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="loses">Loses</Label>
              <input
                type="number"
                id="loses"
                value={loses}
                onChange={handleLosesChange}
                className="form-controll"

              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateLoses}>Update</Button>{' '}
          <Button color="secondary" onClick={toggleLosesModal}>Cancel</Button>
        </ModalFooter>
      </Modal>        
      </div>
    </>
  );
}

export default EquipeGestion;
