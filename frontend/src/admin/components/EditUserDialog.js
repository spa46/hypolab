import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Checkbox } from '@mui/material';
import config from '../../config';

const EditUserDialog = ({ open, onClose, user, onUpdateUser }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser({ ...editedUser, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = () => {
    fetch(`${config.adminUserUrl}/${editedUser.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedUser),
    })
      .then(response => response.json())
      .then(data => {
        onUpdateUser(data);
        onClose();
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
        />
        <TextField
          label="Nickname"
          fullWidth
          margin="normal"
          name="nickname"
          value={editedUser.nickname}
          onChange={handleChange}
        />
        <Checkbox
          name="is_superuser"
          checked={editedUser.is_superuser}
          onChange={handleChange}
        /> Superuser
        <Checkbox
          name="is_staff"
          checked={editedUser.is_staff}
          onChange={handleChange}
        /> Staff
        <Checkbox
          name="is_active"
          checked={editedUser.is_active}
          onChange={handleChange}
        /> Active
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;