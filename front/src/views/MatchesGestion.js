import React, { useCallback, useEffect, useState } from "react";
import "../assets/css/style.css";
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
} from "reactstrap";
import { getAllMatches, deleteMatchById, updateMatchScore, updateMatchDate, updateMatchTime } from "Services/MatchesApi";

function MatchesGestion() {
  // Get matches
// Get matches
const [matchList, setMatchList] = useState([]);
const [selectedMatch, setSelectedMatch] = useState(null);
const [modalType, setModalType] = useState(null);
const [newValue, setNewValue] = useState('');

useEffect(() => {
  fetchMatches();
}, []);

const fetchMatches = useCallback(async () => {
  await getAllMatches()
    .then((res) => {
      setMatchList(res.data.matches);
    })
    .catch((err) => console.log('ErrorGetMatchList:', err));
});

const handleDeleteMatch = async (id) => {
  try {
    await deleteMatchById(id);
    setMatchList((prevList) => prevList.filter(match => match._id !== id));
  } catch (err) {
    console.log('Error deleting match:', err);
  }
};

const handleUpdateMatch = async () => {
  try {
    if (modalType === 'score') {
      await updateMatchScore(selectedMatch._id, { score: newValue });
    } else if (modalType === 'date') {
      await updateMatchDate(selectedMatch._id, { date: newValue });
    } else if (modalType === 'time') {
      await updateMatchTime(selectedMatch._id, { time: newValue });
    }
    fetchMatches(); // Refresh the match list
    setSelectedMatch(null);
    setModalType(null);
  } catch (err) {
    console.log(`Error updating match ${modalType}:`, err);
  }
};

const openModal = (match, type) => {
  setSelectedMatch(match);
  setModalType(type);
  setNewValue('');
};



  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <h2 className="title" style={{ color: '#52bfff' }}>Matches List</h2>
                <p className="category" style={{ color: '#ba54f5' }}>Here is a subtitle for this table</p>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Equipe A</th>
                      <th className="text-center">Equipe B</th>
                      <th className="text-center">Score</th>
                      <th className="text-center">Date</th>
                      <th className="text-center">Time</th>
                      <th className="text-center">Terrain</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchList.map((match, index) => (
                      <tr key={match._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{match.id_equipeA.name}</td>
                        <td className="text-center">{match.id_equipeB.name}</td>
                        <td className="text-center">{match.score}</td>
                        <td className="text-center">{new Date(match.date).toLocaleDateString()}</td>
                        <td className="text-center">{match.time}</td>
                        <td className="text-center">{match.id_Terrain.name}</td>
                        <td className="text-center space-between ">
                          <Button className="btn-icon" color="info"  onClick={() => openModal(match, 'score')}>
                            <i className="fa fa-pencil" /> 
                          </Button>
                          <Button className="btn-icon" color="info"    onClick={() => openModal(match, 'date')}>
                            <i className="fa fa-calendar" /> 
                          </Button>
                          <Button className="btn-icon" color="info"  onClick={() => openModal(match, 'time')}>
                            <i className="fa fa-clock" /> 
                          </Button>
                          <Button className="btn-icon" color="danger"  onClick={() => handleDeleteMatch(match._id)}>
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
        <Modal isOpen={!!selectedMatch && !!modalType} toggle={() => setSelectedMatch(null)}>
          <ModalHeader toggle={() => setSelectedMatch(null)}>Update {modalType}</ModalHeader>
          <ModalBody>
            <input
              type={modalType === 'date' ? 'date' : 'text'}
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              placeholder={`Enter new ${modalType}`}
              className="form-controll"

            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleUpdateMatch}>Update</Button>{' '}
            <Button color="secondary" onClick={() => setSelectedMatch(null)}>Cancel</Button>
          </ModalFooter>
       </Modal>
      </div>
    </>
  );
}

export default MatchesGestion;
