import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/form',
});

// GET all users
export const getAllUsers = () => API.get('/all');

// POST new user
export const addUser = (data) => API.post('/submit', data);

// PATCH update user
export const updateUser = (id, data) => API.patch(`/update/${id}`, data);

// DELETE user
export const deleteUser = (id) => API.delete(`/delete/${id}`);

// GET single user
export const getUserById = (id) => API.get(`/get/${id}`);
export const submitUserForm = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/form/submit', {
        method: 'POST',
        body: formData,
      });
      return response.json();
    } catch (err) {
      console.error('Form submission error:', err);
      throw err;
    }
  };
  