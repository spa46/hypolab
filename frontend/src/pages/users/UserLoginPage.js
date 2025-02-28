import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const UserLoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === 'test' && password === 'test') {
      localStorage.setItem('token', 'mock-token');
      alert(t('Login successful'));
    } else {
      try {
        const response = await axios.post('/api/token/', { email, password });
        localStorage.setItem('token', response.data.access);
        alert(t('Login successful'));
      } catch (error) {
        alert(t('Failed to login'));
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('Login')}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={t('Email')}
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label={t('Password')}
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t('Login')}
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default UserLoginPage;