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

const productValidationSchema = Yup.object({
  name: Yup.string().required('Product name is required'),
  description: Yup.string().required('Product description is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  sku: Yup.string().required('SKU is required'),
  imageUrl: Yup.string().required('Product image URL is required'),
});

const validationSchema = Yup.object({
  products: Yup.array().of(productValidationSchema).min(1, 'At least one product is required'),
});

function ProductDetailsForm({ onSubmit, initialData }) {
  const initialValues = {
    products: initialData?.length ? initialData : [{
      name: '',
      description: '',
      price: '',
      sku: '',
      imageUrl: '',
    }],
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
                Product Details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FieldArray name="products">
                {({ push, remove }) => (
                  <>
                    {values.products.map((product, index) => (
                      <Card key={index} sx={{ mb: 2 }}>
                        <CardContent>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="subtitle1">
                                  Product {index + 1}
                                </Typography>
                                {values.products.length > 1 && (
                                  <IconButton
                                    onClick={() => remove(index)}
                                    color="error"
                                    size="small"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                )}
                              </Box>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name={`products.${index}.name`}
                                label="Product Name"
                                value={product.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.products?.[index]?.name && errors.products?.[index]?.name}
                                helperText={touched.products?.[index]?.name && errors.products?.[index]?.name}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                multiline
                                rows={3}
                                name={`products.${index}.description`}
                                label="Product Description"
                                value={product.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.products?.[index]?.description && errors.products?.[index]?.description}
                                helperText={touched.products?.[index]?.description && errors.products?.[index]?.description}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                name={`products.${index}.price`}
                                label="Price"
                                type="number"
                                value={product.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.products?.[index]?.price && errors.products?.[index]?.price}
                                helperText={touched.products?.[index]?.price && errors.products?.[index]?.price}
                              />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <TextField
                                fullWidth
                                name={`products.${index}.sku`}
                                label="SKU Code"
                                value={product.sku}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.products?.[index]?.sku && errors.products?.[index]?.sku}
                                helperText={touched.products?.[index]?.sku && errors.products?.[index]?.sku}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name={`products.${index}.imageUrl`}
                                label="Product Image URL"
                                value={product.imageUrl}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.products?.[index]?.imageUrl && errors.products?.[index]?.imageUrl}
                                helperText={touched.products?.[index]?.imageUrl && errors.products?.[index]?.imageUrl}
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
                        onClick={() => push({
                          name: '',
                          description: '',
                          price: '',
                          sku: '',
                          imageUrl: '',
                        })}
                      >
                        Add Another Product
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

export default ProductDetailsForm;