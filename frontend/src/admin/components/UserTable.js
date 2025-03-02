import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';

const UserTable = ({ users, onRowClick }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>Nickname</TableCell>
            <TableCell>Superuser</TableCell>
            <TableCell>Staff</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id} onClick={() => onRowClick(user)}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.nickname}</TableCell>
              <TableCell>
                <Checkbox checked={user.is_superuser ?? false} disabled />
              </TableCell>
              <TableCell>
                <Checkbox checked={user.is_staff ?? false} disabled />
              </TableCell>
              <TableCell>
                <Checkbox checked={user.is_active ?? false} disabled />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UserTable;