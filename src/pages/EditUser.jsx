import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { getUserById, updateUser } from '../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUserById(id);
        setInitialValues(data); // Assumes API returns user object
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      await updateUser(id, values);
      alert('User updated successfully!');
      navigate('/');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Edit User</h3>
      {initialValues ? (
        <UserForm onSubmit={handleSubmit} initialValues={initialValues} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditUser;
