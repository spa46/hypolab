import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, InputAdornment } from '@mui/material';

const EditClusterDialog = ({ open, onClose, cluster, onSave }) => {
  const [formData, setFormData] = useState({ ...cluster });
  const [displayName, setDisplayName] = useState(cluster.name.split('_')[0]);
  const nameInputRef = useRef(null);

  useEffect(() => {
    setFormData({ ...cluster });
    setDisplayName(cluster.name.split('_')[0]);
  }, [cluster]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setDisplayName(value);
      setTimeout(() => {
        const cursorPosition = value.length;
        nameInputRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSave = () => {
    const updatedName = `${displayName}_${formData.id.substring(0, 8)}`;
    const updatedCluster = { ...formData, name: updatedName };
    onSave(updatedCluster);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Cluster</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="ID"
          name="id"
          value={formData.id}
          onChange={handleChange}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Name"
          name="name"
          value={displayName}
          onChange={handleChange}
          fullWidth
          inputRef={nameInputRef}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={{ color: 'gray' }}>
                _{formData.id.substring(0, 8)}
              </InputAdornment>
            ),
          }}
        />
        <TextField
          margin="dense"
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Is Registered"
          name="is_registered"
          value={formData.is_registered}
          onChange={handleChange}
          fullWidth
          disabled
        />
        <TextField
          margin="dense"
          label="Is Active"
          name="is_active"
          value={formData.is_active}
          onChange={handleChange}
          fullWidth
          disabled
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