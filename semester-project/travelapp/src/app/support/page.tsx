"use client";
import Header from './Header';
import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, Grid, Box, Card, CardContent, Button, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpandItem = (itemId: number) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(itemId)
        ? prevExpandedItems.filter((id) => id !== itemId)
        : [...prevExpandedItems, itemId]
    );
  };

  const faqData = [
    { id: 1, question: "How do I book a trip?", answer: "You can book a trip directly on our website by selecting your desired destination, dates, and preferences. Follow the booking process and complete the payment to confirm your trip." },
    { id: 2, question: "Is my payment secure?", answer: "Absolutely. We use industry-standard encryption and secure payment gateways to ensure your payment information is protected." },
    { id: 3, question: "What if I need to cancel my reservation?", answer: "If you need to cancel, please refer to our cancellation policy. Depending on when you cancel, you may be eligible for a full or partial refund." },
    { id: 4, question: "How can I contact customer support?", answer: "You can reach us via phone, email, or live chat. Our support team is available 24/7 to assist you." },
    { id: 5, question: "What is your refund policy?", answer: "Our refund policy varies depending on the service. Please review the specific terms during booking or contact us for detailed information." },
  ];

  return (
    <Container maxWidth="md" id="QaA" sx={{ py: 6 }}>
      <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Frequently Asked Questions
      </Typography>
      {faqData.map((item) => (
        <Accordion
          key={item.id}
          expanded={expandedItems.includes(item.id)}
          onChange={() => toggleExpandItem(item.id)}
          sx={{
            backgroundColor: '#f5f5f5',
            color: '#333',
            borderRadius: 2,
            mb: 2,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            '&:before': { display: 'none' },
            '&.MuiAccordion-root:before': { display: 'none' },
            '& .MuiAccordionSummary-root': {
              borderRadius: expandedItems.includes(item.id) ? '8px 8px 0 0' : '8px',
            },
            transition: '0.3s ease',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: '#333' }} />}
            aria-controls={`panel${item.id}-content`}
            id={`panel${item.id}-header`}
          >
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              {item.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: 3 }}>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Container>
  );
};

const ContactUsSection = () => (
  <Box component="section" sx={{ py: 12, backgroundColor: '#f7f7f7' }}>
    <Container maxWidth="sm">
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: 4,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          padding: 6,
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 24px rgba(0, 0, 0, 0.15)',
          },
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
          Need Help? We&apos;re Here for You!
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
          If you need assistance, don&apos;t hesitate to reach out. Our support team is ready to help with any inquiries or issues you may have.
        </Typography>
        <Link  className="inline-block bg-white text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 text-lg" href="/contact">    
        Learn More   
        </Link>
      </Box>
    </Container>
  </Box>
);

const GuidesSection = () => (
  <Box component="section" sx={{ py: 12, backgroundColor: '#ffffff' }}>
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
        Helpful Guides & Resources
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="h6" gutterBottom>Booking Your First Trip</Typography>
              <Typography paragraph>Step-by-step guide to making your first booking with us. Learn how to choose the perfect destination, secure your dates, and complete your booking.</Typography>
              <Link href="#QaA" variant="body2" sx={{ color: 'primary.main' }}>Read More</Link>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="h6" gutterBottom>Understanding Our Insurance Policies</Typography>
              <Typography paragraph>Everything you need to know about our travel insurance options. From trip cancellation to health coverage, find the right plan for your needs.</Typography>
              <Link href="#insuranceInfo" variant="body2" sx={{ color: 'primary.main' }}>Read More</Link>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const TestimonialsSection = () => (
  <Box component="section" sx={{ py: 12, backgroundColor: '#f7f7f7' }}>
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
        What Our Customers Say
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="body1" gutterBottom>“Amazing experience! The customer support team was so helpful and made the booking process smooth and stress-free.”</Typography>
              <Typography variant="body2" color="textSecondary">— Sarah J.</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography variant="body1" gutterBottom>“I had to cancel my trip last minute, but the refund process was quick and hassle-free. Highly recommend!”</Typography>
              <Typography variant="body2" color="textSecondary">— Mark T.</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Link href="/blog" variant="body2" sx={{ color: 'primary.main', fontWeight: 'bold', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
          Read More Reviews and Stories on Our Blog
        </Link>
      </Box>
    </Container>
  </Box>
);

const PrivacyPolicySection = () => (
  <Box component="section" id="privacy-policy" sx={{ py: 12, backgroundColor: '#ffffff' }}>
    <Container maxWidth="md">
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
        Privacy Policy
      </Typography>
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
            <CardContent sx={{ padding: 0 }}>
              <Typography paragraph>
                We are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you use our services.
              </Typography>
              <Typography paragraph>
                We collect information you provide directly to us, such as when you create an account, make a booking, or contact customer support. This information may include your name, email address, payment information, and any other details you provide.
              </Typography>
              <Typography paragraph>
                We use this information to process your bookings, provide customer support, and improve our services. We may also use your information to send you promotional materials, but you can opt-out at any time.
              </Typography>
              <Typography paragraph>
                We implement industry-standard security measures to protect your data. However, no system is completely secure, and we cannot guarantee the absolute security of your information.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textAlign: 'center' }}>
            <img src="/data-protection_10837184.png" alt="Privacy Illustration" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const SupportPage: React.FC = () => {
  return (
    <div>
      <Header />

      <FAQSection />

      <ContactUsSection />

      <GuidesSection />

      <TestimonialsSection />

      <Box component="section" id="terms-conditions" sx={{ py: 12, backgroundColor: '#f7f7f7' }}>
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
            Terms & Conditions
          </Typography>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
                <CardContent sx={{ padding: 0 }}>
                  <Typography paragraph>
                    The General Terms and Conditions are an integral part of the Package Travel Contract concluded between the Agency as the travel organizer on one side and the Traveler on the other side.
                  </Typography>
                  <Typography paragraph>
                    In addition to these General Terms, an integral part of the Contract is also the Travel Program in the package arrangement. If indicated in the Contract and/or Travel Program, the Contract is also governed by Special Business Conditions.
                  </Typography>
                  <Typography paragraph>
                    The General Terms apply only to package arrangements where the Agency is the organizer. Therefore, these General Terms do not apply if the Agency intermediates and/or sells services of other travel agencies.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <img src="/terms.png" alt="Terms Illustration" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box component="section" id="insuranceInfo" sx={{ py: 12, backgroundColor: '#ffffff' }}>
  <Container maxWidth="md">
    <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
      Insurance Information
    </Typography>
    <Grid container spacing={4} alignItems="center">
      {/* Image on the left */}
      <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }}>
        <Box sx={{ textAlign: 'center' }}>
          <img src="/insurance2.png" alt="Insurance Illustration" style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }} />
        </Box>
      </Grid>
      
      {/* Text on the right */}
      <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
        <Card sx={{ boxShadow: 'none', backgroundColor: 'transparent' }}>
          <CardContent sx={{ padding: 0 }}>
            <Typography paragraph>
              We recommend and offer a comprehensive travel insurance package to all our passengers for coverage against accidents and illnesses, luggage loss, voluntary health insurance during travel, trip cancellation, and assistance in case of accidents.
            </Typography>
            <Typography paragraph>
              The insurance contract is concluded before the start of the journey, no later than the day preceding the day of travel. Trip cancellation insurance must be arranged when signing the travel contract or purchasing a non-refundable airline ticket.
            </Typography>
            <Typography paragraph>
              Note: If you arrange the insurance contract independently, the conditions and deadlines may vary among insurance companies.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Container>
</Box>
      <PrivacyPolicySection/>
    </div>
  );
};

export default SupportPage;
