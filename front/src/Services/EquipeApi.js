// Services/EquipeApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/equipes'; // Update this URL based on your backend endpoint

export async function getAllEquipes() {
  return await axios.get(`${API_URL}/getEquipes`);
}

export async function deleteEquipeById(id) {
  return await axios.delete(`${API_URL}/deleteEquipes/${id}`);
}

export async function getAllEquipesByName(name) {
  return await axios.get(`${API_URL}/getEquipesByName/${name}`);
}


// Update equipe number of wins
export const updateEquipeNbrWins = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/updateEquipeNbrWins/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating equipe number of wins:', error);
    throw error;
  }
};

// Update equipe number of loses
export const updateEquipeNbrLoses = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/updateEquipeNbrLoses/${id}`, data);
    return response;
  } catch (error) {
    console.error('Error updating equipe number of loses:', error);
    throw error;
  }
};
