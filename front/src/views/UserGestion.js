// UserGestion.js
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
} from "reactstrap";
import { getAllUsers, deleteUserById, getAllUsersByName } from "Services/UserApi";

function UserGestion() {
  // Get users
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = useCallback(async () => {
    await getAllUsers()
      .then((res) => {
        console.log(res);
        setUserList(res.data.users);
      })
      .catch((err) => console.log('ErrorGetUserList:', err));
  });

  // Search
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await getAllUsersByName(value); // Fetch users by name
        setUserList(response.data.users);
      } catch (err) {
        console.log('ErrorGetUserListSearch:', err);
      }
    } else {
      fetchUsers(); // If search term is empty, fetch all users
    }
  };

  // Delete user
  const handleDeleteUser = async (id) => {
    try {
      await deleteUserById(id);
      // Optionally, refetch the users or update the local state
      setUserList((prevList) => prevList.filter(user => user._id !== id));
      console.log(`User with id ${id} deleted successfully.`);
    } catch (err) {
      console.log('Error deleting user:', err);
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card className="card-plain">
              <CardHeader>
                <h2 className="title" style={{ color: '#52bfff' }}>Users List</h2>
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
                      <th className="text-center">Image</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Age</th>
                      <th className="text-center">Email</th>
                      <th className="text-center">Role</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) => (
                      <tr key={user._id}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">
                          <img
                            src={`http://localhost:5000/${user.image_user}`} // Adjust the path as needed
                            alt={user.name} // Provide alt text for accessibility
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} // Style the image
                          />
                        </td>
                        <td className="text-center">{user.name}</td>
                        <td className="text-center">{user.age}</td>
                        <td className="text-center">{user.email}</td>
                        <td className="text-center">{user.role}</td>
                        <td className="text-center">
                          <Button className="btn-icon" color="danger" size="sm" onClick={() => handleDeleteUser(user._id)}>
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
      </div>
    </>
  );
}

export default UserGestion;
