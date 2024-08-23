"use client";
import Header from './Header';
import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQSection = () => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleExpandItem = (itemId: number) => {
    setExpandedItems((prevExpandedItems) => {
      if (prevExpandedItems.includes(itemId)) {
        return prevExpandedItems.filter((id) => id !== itemId);
      } else {
        return [...prevExpandedItems, itemId];
      }
    });
  };

  const faqData = [
    { id: 1, question: "How do I book a trip?", answer: "You can book a trip by following these steps..." },
    { id: 2, question: "Is my payment secure?", answer: "Yes, we use secure payment methods..." },
    { id: 3, question: "What if I need to cancel my reservation?", answer: "You can cancel your reservation by..." },
  ];

  return (
    <div className="container mx-auto text-center bg-gray-50 py-10">
      <div className="grid grid-cols-1 gap-6 mt-5">
        {faqData.map((item) => (
          <Accordion
            key={item.id}
            expanded={expandedItems.includes(item.id)}
            onChange={() => toggleExpandItem(item.id)}
            className="mx-auto w-full md:w-3/4 lg:w-1/2"
            sx={{
              backgroundColor: '#0080ff',
              color: '#ffffff',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              borderRadius: '12px',
              transition: 'all 0.3s ease-in-out',
              '&:before': {
                display: 'none', // Remove default border
              },
              '&.MuiAccordion-root.Mui-expanded': {
                margin: 'auto',
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#ffffff' }} />}
              aria-controls="panel1a-content"
              id={`panel${item.id}-header`}
              sx={{
                borderRadius: '12px',
                '& .MuiAccordionSummary-content': {
                  justifyContent: 'center', // Center the text horizontally
                  margin: 'auto',
                },
              }}
            >
              <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: '#f5f5f5',
                color: '#333',
                borderRadius: '0 0 12px 12px',
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
              }}
            >
              <Typography>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

const SupportPage: React.FC = () => {
  return (
    <div>
      <Header />
      <FAQSection />

      <section className="py-12 text-center bg-white">
        <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-600 pb-2">Terms & Conditions</h2>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
          <div className="text-center md:text-left md:mr-20 md:ml-5 mb-5 md:mb-0">
            <div className="flex flex-col text-gray-800">
              <p className="mb-8">
                The General Terms and Conditions are an integral part of the Package Travel Contract concluded between the Agency as the travel organizer on one side and the Traveler on the other side.
              </p>
              <p className="mb-8">
                In addition to these General Terms, an integral part of the Contract is also the Travel Program in the package arrangement. If indicated in the Contract and/or Travel Program, the Contract is also governed by Special Business Conditions, in addition to these General Terms.
              </p>
              <p className="mb-8">
                In case the Contract, Travel Program, or Special Conditions specify differently regarding any of the points in these General Terms, the order of precedence is as follows: the Contract, then the Travel Program, followed by the Special Conditions, and finally, the General Terms.
              </p>
              <p className="mb-8">
                The General Terms apply only to package arrangements where the Agency is the organizer. Therefore, these General Terms do not apply if the Agency intermediates and/or sells services of other travel agencies.
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <img src="/terms.png" alt="Terms Illustration" className="max-w-full h-auto rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      <section className="py-12 text-center bg-gray-100">
        <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-blue-600 pb-2">Insurance Information</h2>
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center">
          <div className="hidden md:block">
            <img src="/insurance2.png" alt="Insurance Illustration" className="max-w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="text-center md:text-left md:ml-10 mb-5 md:mb-0">
            <div className="flex flex-col text-gray-800">
              <p className="mb-8">
                We recommend and offer a comprehensive travel insurance package to all our passengers for the purpose of coverage against the consequences of accidents and illnesses during the journey, damage, and loss of luggage, voluntary health insurance during travel and stay abroad, insurance in case of trip cancellation, and insurance covering the costs of assistance and return of passengers to the place of departure in case of accidents and illnesses.
              </p>
              <p className="mb-8">
                According to the insurer&apos;s terms, the insurance contract is concluded exclusively before the start of the journey, no later than the day preceding the day of travel. Trip cancellation insurance is concluded when signing the travel contract or purchasing a non-refundable airline ticket. Exceptionally, trip cancellation insurance can be arranged within 48 hours of signing the travel contract or purchasing an airline ticket, but provided that the journey does not begin within the next 14 days. If trip cancellation insurance is arranged after the expiration of 48 hours from signing the travel contract or purchasing an airline ticket, there is no obligation for the insurer to pay compensation.
              </p>
              <p className="mb-8">
                Note: If you arrange the insurance contract independently, the conditions and deadlines for concluding the insurance contract may vary among insurance companies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;
