import React from 'react';
import UserTable from '../components/UserTable';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h3>User Management Dashboard</h3>
      <UserTable />
    </div>
  );
};

export default Dashboard;
