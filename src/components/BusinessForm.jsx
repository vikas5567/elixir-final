import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import CompanyInfoForm from './forms/CompanyInfoForm';
import ProductDetailsForm from './forms/ProductDetailsForm';
import ContentForm from './forms/ContentForm';
import ThemeForm from './forms/ThemeForm';
const steps = [
  'Company Information',
  'Product Details',
  'Page Content',
  'Theme Selection'
];

function BusinessForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    companyInfo: {},
    products: [],
    content: {},
    theme: {},

  });
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = (data) => {
    setFormData((prev) => ({
      ...prev,
      [Object.keys(data)[0]]: Object.values(data)[0],
    }));

    if (activeStep === steps.length - 1) {
      // Save form data and navigate to preview
      localStorage.setItem('websiteData', JSON.stringify(formData));
      navigate('/preview');
    } else {
      handleNext();
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CompanyInfoForm onSubmit={handleFormSubmit} initialData={formData.companyInfo} />;
      case 1:
        return <ProductDetailsForm onSubmit={handleFormSubmit} initialData={formData.products} />;
      case 2:
        return <ContentForm onSubmit={handleFormSubmit} initialData={formData.content} />;
      case 3:
        return <ThemeForm onSubmit={handleFormSubmit} initialData={formData.theme} />;

      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 800, mx: 'auto' }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Your Website
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {getStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default BusinessForm;