// src/admin/components/ClusterTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Checkbox, Button } from '@mui/material';

const ClusterTable = ({ clusters, onRegister, onToggleActive, onRowClick }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>Register</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {clusters.map((cluster) => (
          <TableRow key={cluster.id} onClick={() => onRowClick(cluster)}>
            <TableCell>{cluster.id}</TableCell>
            <TableCell>{cluster.name}</TableCell>
            <TableCell>{cluster.location}</TableCell>
            <TableCell>
              <Checkbox
                checked={cluster.is_active}
                onChange={(e) => {
                  e.stopPropagation();
                  onToggleActive(cluster.id);
                }}
              />
            </TableCell>
            <TableCell>
              {cluster.is_registered ? (
                'Registered'
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRegister(cluster.id);
                  }}
                >
                  Register
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ClusterTable;