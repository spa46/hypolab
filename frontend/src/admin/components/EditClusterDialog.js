// frontend/src/admin/components/EditClusterDialog.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

const EditClusterDialog = ({ open, onClose, cluster, onSave }) => {
  const [formData, setFormData] = useState({ ...cluster });

  useEffect(() => {
    setFormData({ ...cluster });
  }, [cluster]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Cluster</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
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

export default EditClusterDialog;