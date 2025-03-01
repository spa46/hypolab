// src/admin/pages/AdminUserPage.js
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import AddUserDialog from '../components/AddUserDialog';
import UserTable from '../components/UserTable';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch users from the API
    fetch('/api/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.nickname.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={handleSearchChange}
      />
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add User
      </Button>
      <UserTable users={filteredUsers} />
      <AddUserDialog open={open} onClose={() => setOpen(false)} onAddUser={handleAddUser} />
    </Container>
  );
};

export default AdminUserPage;