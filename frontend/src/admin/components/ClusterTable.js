import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox } from '@mui/material';

const ClusterTable = ({ clusters, onRegister, onRowClick, onDelete }) => {
  const [selectedIds, setSelectedIds] = useState([]);

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

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clusters.map(cluster => (
            <TableRow key={cluster.id} onClick={() => onRowClick(cluster)}>
              <TableCell onClick={(event) => event.stopPropagation()}>
                <Checkbox
                  checked={selectedIds.includes(cluster.id)}
                  onChange={(event) => handleCheckboxChange(event, cluster.id)}
                />
              </TableCell>
              <TableCell>{cluster.id}</TableCell>
              <TableCell>{cluster.name}</TableCell>
              <TableCell>{cluster.location}</TableCell>
              <TableCell onClick={(event) => event.stopPropagation()}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={(event) => { event.stopPropagation(); onRegister(cluster.id); }}
                >
                  Register
                </Button>
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