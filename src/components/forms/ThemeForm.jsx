import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Radio,
  FormControlLabel,
  RadioGroup,
} from '@mui/material';

const colorThemes = [
  {
    id: 'blue-white',
    name: 'Blue & White',
    primary: '#1976d2',
    secondary: '#ffffff',
    accent: '#2196f3',
  },
  {
    id: 'green-black',
    name: 'Green & Black',
    primary: '#2e7d32',
    secondary: '#000000',
    accent: '#4caf50',
  },
  {
    id: 'purple-gray',
    name: 'Purple & Gray',
    primary: '#7b1fa2',
    secondary: '#9e9e9e',
    accent: '#e1bee7',
  },
  {
    id: 'red-white',
    name: 'Red & White',
    primary: '#d32f2f',
    secondary: '#ffffff',
    accent: '#ff5252',
  },
];

const validationSchema = Yup.object({
  theme: Yup.object({
    selectedTheme: Yup.string().required('Please select a color theme'),
  }),
});

function ThemeForm({ onSubmit, initialData }) {
  const initialValues = {
    theme: {
      selectedTheme: initialData?.selectedTheme || '',
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Choose Your Theme
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <RadioGroup
                name="theme.selectedTheme"
                value={values.theme.selectedTheme}
                onChange={handleChange}
              >
                <Grid container spacing={2}>
                  {colorThemes.map((theme) => (
                    <Grid item xs={12} sm={6} key={theme.id}>
                      <Card
                        sx={{
                          border: values.theme.selectedTheme === theme.id
                            ? `2px solid ${theme.primary}`
                            : '2px solid transparent',
                        }}
                      >
                        <CardActionArea>
                          <CardContent>
                            <FormControlLabel
                              value={theme.id}
                              control={<Radio />}
                              label={
                                <Box>
                                  <Typography variant="subtitle1">
                                    {theme.name}
                                  </Typography>
                                  <Box
                                    sx={{
                                      display: 'flex',
                                      gap: 1,
                                      mt: 1,
                                    }}
                                  >
                                    {[theme.primary, theme.secondary, theme.accent].map(
                                      (color, index) => (
                                        <Box
                                          key={index}
                                          sx={{
                                            width: 40,
                                            height: 40,
                                            backgroundColor: color,
                                            borderRadius: 1,
                                            border: '1px solid #e0e0e0',
                                          }}
                                        />
                                      )
                                    )}
                                  </Box>
                                </Box>
                              }
                            />
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default ThemeForm;