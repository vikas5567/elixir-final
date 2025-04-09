import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Stack,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { supabase } from '../lib/supabaseClient';

function Navbar() {
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    handleClose();
  };

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
          {user ? (
            <>
              <IconButton onClick={handleProfileClick} color="inherit">
                <Avatar sx={{ width: 32, height: 32 }}>
                  {user.email?.[0].toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem disabled>
                  {user.email}
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              startIcon={<LoginIcon />}
            >
              Login
            </Button>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;