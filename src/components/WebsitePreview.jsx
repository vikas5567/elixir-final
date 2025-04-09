import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  WhatsApp,
  Twitter,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

function WebsitePreview() {
  const websiteData = JSON.parse(localStorage.getItem('websiteData') || '{}');
  const { companyInfo, products, content, theme, socialMedia } = websiteData;

  const selectedTheme = {
    'blue-white': {
      primary: '#1976d2',
      secondary: '#ffffff',
      accent: '#2196f3',
    },
    'green-black': {
      primary: '#2e7d32',
      secondary: '#000000',
      accent: '#4caf50',
    },
    'purple-gray': {
      primary: '#7b1fa2',
      secondary: '#9e9e9e',
      accent: '#e1bee7',
    },
    'red-white': {
      primary: '#d32f2f',
      secondary: '#ffffff',
      accent: '#ff5252',
    },
  }[theme?.selectedTheme || 'blue-white'];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          bgcolor: selectedTheme.primary,
          color: 'white',
          py: 4,
          mb: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={companyInfo?.logo}
                alt={companyInfo?.businessName}
                sx={{ maxHeight: 100, mb: 2 }}
              />
              <Typography variant="h3" component="h1" gutterBottom>
                {companyInfo?.businessName}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Phone sx={{ mr: 1 }} />
                  {companyInfo?.contactNumber}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 1 }} />
                  {companyInfo?.email}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Products Section */}
      <Container maxWidth="lg">
        <Typography variant="h4" component="h2" gutterBottom>
          Our Products
        </Typography>
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {products?.map((product, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color={selectedTheme.primary}>
                    ${product.price}
                  </Typography>
                  <Typography variant="caption" display="block">
                    SKU: {product.sku}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, bgcolor: selectedTheme.primary }}
                    fullWidth
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* About Us Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            {content?.aboutUs}
          </Typography>
        </Box>

        {/* Special Offers Section */}
        {content?.specialOffers && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Special Offers
            </Typography>
            <Paper sx={{ p: 3, bgcolor: selectedTheme.accent + '20' }}>
              <Typography variant="body1">{content.specialOffers}</Typography>
            </Paper>
          </Box>
        )}

        {/* Testimonials Section */}
        {content?.testimonials?.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h4" component="h2" gutterBottom>
              Testimonials
            </Typography>
            <Grid container spacing={3}>
              {content.testimonials.map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="body1" paragraph>
                        "{testimonial.text}"
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary">
                        - {testimonial.author}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Contact Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Contact Us
          </Typography>
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationOn sx={{ mr: 2, color: selectedTheme.primary }} />
                  <Typography>{companyInfo?.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 2, color: selectedTheme.primary }} />
                  <Typography>{companyInfo?.contactNumber}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Email sx={{ mr: 2, color: selectedTheme.primary }} />
                  <Typography>{companyInfo?.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  {socialMedia?.facebook && (
                    <IconButton
                      href={socialMedia.facebook}
                      target="_blank"
                      sx={{ color: selectedTheme.primary }}
                    >
                      <Facebook />
                    </IconButton>
                  )}
                  {socialMedia?.instagram && (
                    <IconButton
                      href={socialMedia.instagram}
                      target="_blank"
                      sx={{ color: selectedTheme.primary }}
                    >
                      <Instagram />
                    </IconButton>
                  )}
                  {socialMedia?.whatsapp && (
                    <IconButton
                      href={`https://wa.me/${socialMedia.whatsapp}`}
                      target="_blank"
                      sx={{ color: selectedTheme.primary }}
                    >
                      <WhatsApp />
                    </IconButton>
                  )}
                  {socialMedia?.twitter && (
                    <IconButton
                      href={socialMedia.twitter}
                      target="_blank"
                      sx={{ color: selectedTheme.primary }}
                    >
                      <Twitter />
                    </IconButton>
                  )}
                  {socialMedia?.linkedin && (
                    <IconButton
                      href={socialMedia.linkedin}
                      target="_blank"
                      sx={{ color: selectedTheme.primary }}
                    >
                      <LinkedIn />
                    </IconButton>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: selectedTheme.primary, color: 'white', py: 3, mt: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} {companyInfo?.businessName}. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default WebsitePreview;