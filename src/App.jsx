import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Navbar from './components/Navbar';
import BusinessForm from './components/BusinessForm';
import WebsitePreview from './components/WebsitePreview';
import AuthForm from './components/forms/AuthForm';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<BusinessForm />} />
          <Route path="/preview" element={<WebsitePreview />} />
          <Route path="/login" element={<AuthForm />} />
          <Route path="/signup" element={<AuthForm />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;