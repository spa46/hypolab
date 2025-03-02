import React, { useState, useEffect } from 'react';
import { Container, TextField, Button } from '@mui/material';
import UserTable from '../components/UserTable';
import AddUserDialog from '../components/AddUserDialog';
import EditUserDialog from '../components/EditUserDialog';
import config from '../../config';

const AdminUserPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetch(`${config.adminUserUrl}`)
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
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
      <UserTable users={filteredUsers} onRowClick={handleRowClick} />
      <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
        Add User
      </Button>
      <AddUserDialog open={openAddDialog} onClose={() => setOpenAddDialog(false)} onAddUser={handleAddUser} />
      {selectedUser && (
        <EditUserDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          user={selectedUser}
          onUpdateUser={handleUpdateUser}
        />
      )}
    </Container>
  );
};

export default AdminUserPage;