import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <WebIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
              fontWeight: 700,
            }}
          >
            WebsiteBoss
          </Typography>
        </Box>
        <Stack direction="row" spacing={2}>
          <Button
            component={RouterLink}
            to="/"
            color="inherit"
          >
            Create Website
          </Button>
          <Button
            component={RouterLink}
            to="/preview"
            color="inherit"
          >
            Preview
          </Button>
          <Button
            component={RouterLink}
            to="/login"
            color="inherit"
            startIcon={<LoginIcon />}
          >
            Login
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;