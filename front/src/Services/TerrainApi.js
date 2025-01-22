import axios from 'axios';

const API_URL = 'http://localhost:5000/terrains'; // Replace with your API URL

export async function getAllTerrains(){
     return await axios.get(`${API_URL}/getTerrains`)
}

export async function DeleteTerrainById(id){
    return await axios.delete(`${API_URL}/deleteTerrain/${id}`)
}


export async function addTerrain(formData) {
    return await axios.post(`${API_URL}/addTerrain`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure to set this header
      },
    });
  }

export async function UpdateTerrainById(id,formData) {


    return await axios.put(`${API_URL}/updateTerrain/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Ensure to set this header
      },
    });
  }
export async function getAllTerrainsByName(name){
    return await axios.get(`${API_URL}/getTerrainsByName/${name}`)
}

