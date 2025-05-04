import React, { useEffect, useState } from 'react';
import { getAllUsers, deleteUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { generatePDF } from '../services/pdfService'; // Import the PDF generator

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const res = await getAllUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete user?')) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  const handleDownload = (user) => {
    generatePDF(user); // Pass the user object to PDF generator
  };

  return (
    <div className="table-container">
      <button onClick={() => navigate('/add')} className="btn btn-success mb-3">
        Add User
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Mobile</th>
            <th>DOB</th>
            <th>Aadhar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullName}</td>
              <td>{user.mobile1}</td>
              <td>{user.dob}</td>
              <td>{user.aadharNo}</td>
              <td>
                <button
                  onClick={() => navigate(`/edit/${user._id}`)}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-danger btn-sm ms-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleDownload(user)}
                  className="btn btn-info btn-sm ms-2"
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
