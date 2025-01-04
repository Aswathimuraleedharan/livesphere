import React from 'react';
import { Box, Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AdminDashboard() {
  const navigate = useNavigate(); // Hook for navigation

  const logout = () => {
    localStorage.removeItem('token'); // Clear the JWT token from localStorage
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <Container sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', padding: 4, backgroundColor: '#3f51b5', borderRadius: 2, boxShadow: 3, color: 'white' }}>
        <Typography variant="h3" component="h1">WELCOME TO ADMIN DASHBOARD</Typography>
        <Button variant="contained" color="secondary" onClick={logout} sx={{ marginTop: 3 }}>
          Logout
        </Button>
      </Box>
    </Container>
  );
}

export default AdminDashboard;




