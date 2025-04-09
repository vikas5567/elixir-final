import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from '@mui/material';

const validationSchema = Yup.object({
  companyInfo: Yup.object({
    businessName: Yup.string().required('Business name is required'),
    logo: Yup.string().required('Logo URL is required'),
    contactNumber: Yup.string().required('Contact number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    address: Yup.string().required('Address is required'),
  }),
});

function CompanyInfoForm({ onSubmit, initialData }) {
  const initialValues = {
    companyInfo: {
      businessName: initialData?.businessName || '',
      logo: initialData?.logo || '',
      contactNumber: initialData?.contactNumber || '',
      email: initialData?.email || '',
      address: initialData?.address || '',
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
                Company Information
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="companyInfo.businessName"
                label="Business Name"
                value={values.companyInfo.businessName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.companyInfo?.businessName && errors.companyInfo?.businessName}
                helperText={touched.companyInfo?.businessName && errors.companyInfo?.businessName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="companyInfo.logo"
                label="Logo URL"
                value={values.companyInfo.logo}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.companyInfo?.logo && errors.companyInfo?.logo}
                helperText={touched.companyInfo?.logo && errors.companyInfo?.logo}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="companyInfo.contactNumber"
                label="Contact Number"
                value={values.companyInfo.contactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.companyInfo?.contactNumber && errors.companyInfo?.contactNumber}
                helperText={touched.companyInfo?.contactNumber && errors.companyInfo?.contactNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="companyInfo.email"
                label="Email"
                type="email"
                value={values.companyInfo.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.companyInfo?.email && errors.companyInfo?.email}
                helperText={touched.companyInfo?.email && errors.companyInfo?.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="companyInfo.address"
                label="Address"
                multiline
                rows={3}
                value={values.companyInfo.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.companyInfo?.address && errors.companyInfo?.address}
                helperText={touched.companyInfo?.address && errors.companyInfo?.address}
              />
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

export default CompanyInfoForm;