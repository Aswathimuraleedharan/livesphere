import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ChatComponent from './components/ChatComponent';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/chat" element={<ChatComponent />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;



