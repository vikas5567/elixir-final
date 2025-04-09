import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  Alert,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { supabase } from '../../lib/supabaseClient';

const loginValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const signupValidationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

function AuthForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  const [error, setError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
        navigate('/');
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
        if (error) throw error;
        navigate('/login');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 4, p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Typography variant="h5" component="h1" align="center" gutterBottom>
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>

        <Formik
          initialValues={isLogin ? { email: '', password: '' } : { email: '', password: '', confirmPassword: '' }}
          validationSchema={isLogin ? loginValidationSchema : signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              {!isLogin && (
                <TextField
                  fullWidth
                  margin="normal"
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3 }}
                disabled={isSubmitting}
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </Button>
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2">
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <Link
                    component={RouterLink}
                    to={isLogin ? '/signup' : '/login'}
                    color="primary"
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </Link>
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default AuthForm;