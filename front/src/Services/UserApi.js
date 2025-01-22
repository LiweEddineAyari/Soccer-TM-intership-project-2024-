import axios from 'axios';

const API_URL = 'http://localhost:5000/users'; // Replace with your API URL

export async function getAllUsers(){
     return await axios.get(`${API_URL}/getAllUser`)
}

export async function deleteUserById(id){
    return await axios.delete(`${API_URL}/deleteUser/${id}`)
}

export async function getAllUsersByName(name){
    return await axios.get(`${API_URL}/getUsersByName/${name}`)
}


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {email, password},{ withCredentials: true });
        return response.data.user;
    } catch (err) {
        console.error('Error logging in:', err);
        throw err;
    }
};

export const getSessionUser = async () => {
    try {
        return await axios.get(`${API_URL}/session-user`,{ withCredentials: true });
         
    } catch (err) {
        console.error('Error fetching session user:', err);
        throw err;
    }
};

export const signUpUser = async ({ name, age, email, password}) => {
    try {
        const response = await axios.post(`${API_URL}/addUser`, { name, age, email, password}, { withCredentials: true });
        return response.data;
    } catch (err) {
        console.error('Error signing up user:', err.response ? err.response.data : err.message);
        throw err;
    }
};


export const uploadUserImage = async (userId, imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image_user', imageFile);

        const response = await axios.put(`${API_URL}/updateUserImg/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true // Include credentials if needed
        });

        return response.data;
    } catch (err) {
        console.error('Error uploading user image:', err.response ? err.response.data : err.message);
        throw err;
    }
};


export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/updateUser/${userId}`, userData, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      return response.data;
    } catch (error) {
      throw new Error('Logout failed:', error);
    }
  };