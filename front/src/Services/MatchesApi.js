
import axios from 'axios';

const API_URL = 'http://localhost:5000/matchs'; // Update this URL based on your backend endpoint



export const getAllMatches = async () => {
  return await axios.get(`${API_URL}/getAllMatches`);
};

export const getMatchByName = async (name) => {
  return await axios.get(`${API_URL}/getMatchByName/${name}`);
};

export const deleteMatchById = async (id) => {
    return await axios.delete(`${API_URL}/deleteMatch/${id}`);
  };

  export const updateMatchScore = (id, data) => axios.put(`${API_URL}/updateMatchScore/${id}`, data);
export const updateMatchDate = (id, data) => axios.put(`${API_URL}/updateMatchDate/${id}`, data);
export const updateMatchTime = (id, data) => axios.put(`${API_URL}/updateMatchTime/${id}`, data);