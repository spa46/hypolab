import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox, IconButton, Menu, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ClusterTable = ({ clusters, onRegister, onRowClick, onDelete, registrationStatus }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuClusterId, setMenuClusterId] = useState(null);

  const handleCheckboxChange = (event, id) => {
    event.stopPropagation();
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(selectedId => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleDeleteSelected = () => {
    onDelete(selectedIds);
    setSelectedIds([]);
  };

  const handleMenuOpen = (event, id) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuClusterId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuClusterId(null);
  };

  const handleMenuItemClick = (action) => {
    handleMenuClose();
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clusters.map(cluster => (
            <TableRow key={cluster.id}>
              <TableCell onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.includes(cluster.id)}
                  onChange={(event) => handleCheckboxChange(event, cluster.id)}
                />
              </TableCell>
              <TableCell>{cluster.id}</TableCell>
              <TableCell>{cluster.location}</TableCell>
              <TableCell onClick={(event) => event.stopPropagation()}>
                {cluster.is_registered ? (
                  <>
                    <IconButton onClick={(event) => { event.stopPropagation(); onRowClick(cluster); }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={(event) => handleMenuOpen(event, cluster.id)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl) && menuClusterId === cluster.id}
                      onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleMenuItemClick('restart')}>Restart</MenuItem>
                      <MenuItem onClick={() => handleMenuItemClick('status')}>Status</MenuItem>
                    </Menu>
                  </>
                ) : (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={(event) => { event.stopPropagation(); onRegister(cluster.id); }}
                  >
                    Register
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleDeleteSelected}
        disabled={selectedIds.length === 0}
      >
        Delete Selected
      </Button>
    </>
  );
};

export default ClusterTable;