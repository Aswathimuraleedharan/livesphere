import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, Card, CardContent, Avatar, Grid, Divider, Snackbar, Alert } from '@mui/material';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SOCKET_SERVER_URL = 'http://localhost:3005'; // WebSocket server URL

function ChatComponent() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' }); // Snackbar state
  const navigate = useNavigate(); // Hook for navigation

  const logout = () => {
    localStorage.removeItem('token'); // Clear the JWT token from localStorage
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to the login page after logout
  };

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, { text: msg, sender: 'server' }]);
      showSnackbar('Message received from server', 'success');
    });

    return () => newSocket.disconnect();
  }, []);

  const handleSend = () => {
    if (message.trim() && socket) {
      // Add the sent message to the chat display
      setMessages((prevMessages) => [...prevMessages, { text: message, sender: 'me' }]);
      socket.emit('message', message); // Send the message to the server
      setMessage(''); // Clear input field
      showSnackbar('Message sent', 'info');
    }
  };

  const showSnackbar = (msg, severity) => {
    setSnackbar({ open: true, message: msg, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: 'info' });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center', alignItems: 'center', bgcolor: '#f5f5f5' }}>
      <Card sx={{ width: '100%', maxWidth: 600, padding: 2, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>Chat Application</Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Type your message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSend}>Send</Button>
            </Grid>
          </Grid>

          <Divider sx={{ marginTop: 2 }} />

          <Box sx={{ marginTop: 2, maxHeight: 300, overflowY: 'auto', padding: 2 }}>
            <Typography variant="h6" gutterBottom>Messages:</Typography>
            <List>
              {messages.map((msg, index) => (
                <ListItem key={index} sx={{ justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start' }}>
                  {msg.sender === 'me' ? null : <Avatar sx={{ marginRight: 2 }} />}
                  <ListItemText
                    primary={msg.text}
                    sx={{
                      bgcolor: msg.sender === 'me' ? '#cce4f7' : '#f5f5f5',
                      padding: 1,
                      borderRadius: 2,
                      textAlign: msg.sender === 'me' ? 'right' : 'left',
                      maxWidth: '70%',
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Button variant="contained" color="secondary" onClick={logout} sx={{ marginTop: 3 }}>
                Logout
              </Button>

      
    </Box>
  );
}

export default ChatComponent;








