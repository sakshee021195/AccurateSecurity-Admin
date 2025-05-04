import React from 'react';
import UserForm from '../components/UserForm';
import { addUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await addUser(values);
      alert('User added successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add New User</h3>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
};

export default AddUser;
