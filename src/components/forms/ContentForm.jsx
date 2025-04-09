import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const validationSchema = Yup.object({
  content: Yup.object({
    aboutUs: Yup.string().required('About Us text is required'),
    specialOffers: Yup.string(),
    testimonials: Yup.array().of(
      Yup.object({
        author: Yup.string().required('Author name is required'),
        text: Yup.string().required('Testimonial text is required'),
      })
    ),
  }),
});

function ContentForm({ onSubmit, initialData }) {
  const initialValues = {
    content: {
      aboutUs: initialData?.aboutUs || '',
      specialOffers: initialData?.specialOffers || '',
      testimonials: initialData?.testimonials || [
        { author: '', text: '' },
      ],
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Page Content
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="content.aboutUs"
                label="About Us"
                value={values.content.aboutUs}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.content?.aboutUs && errors.content?.aboutUs}
                helperText={touched.content?.aboutUs && errors.content?.aboutUs}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                name="content.specialOffers"
                label="Special Offers"
                value={values.content.specialOffers}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.content?.specialOffers && errors.content?.specialOffers}
                helperText={touched.content?.specialOffers && errors.content?.specialOffers}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Testimonials
              </Typography>
              <FieldArray name="content.testimonials">
                {({ push, remove }) => (
                  <>
                    {values.content.testimonials.map((testimonial, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle2">
                                  Testimonial {index + 1}
                                </Typography>
                                <IconButton
                                  onClick={() => remove(index)}
                                  color="error"
                                  size="small"
                                  disabled={values.content.testimonials.length === 1}
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name={`content.testimonials.${index}.author`}
                                label="Author Name"
                                value={testimonial.author}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.content?.testimonials?.[index]?.author &&
                                  errors.content?.testimonials?.[index]?.author
                                }
                                helperText={
                                  touched.content?.testimonials?.[index]?.author &&
                                  errors.content?.testimonials?.[index]?.author
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                multiline
                                rows={2}
                                name={`content.testimonials.${index}.text`}
                                label="Testimonial Text"
                                value={testimonial.text}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={
                                  touched.content?.testimonials?.[index]?.text &&
                                  errors.content?.testimonials?.[index]?.text
                                }
                                helperText={
                                  touched.content?.testimonials?.[index]?.text &&
                                  errors.content?.testimonials?.[index]?.text
                                }
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button
                        type="button"
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => push({ author: '', text: '' })}
                      >
                        Add Another Testimonial
                      </Button>
                    </Box>
                  </>
                )}
              </FieldArray>
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

export default ContentForm;