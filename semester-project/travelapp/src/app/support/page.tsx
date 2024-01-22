"use client";
import Header from './Header';
import React, { useState } from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const FAQSection = () => {
  // State to track whether each FAQ item is expanded or not
  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  // Function to toggle the expansion of a specific FAQ item
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
    { id: 1, question: 'How do I book a trip?', answer: 'You can book a trip by following these steps...' },
    { id: 2, question: 'Is my payment secure?', answer: 'Yes, we use secure payment methods...' },
    { id: 3, question: 'What if I need to cancel my reservation?', answer: 'You can cancel your reservation by...' },
  ];

  return (
    <div className="container mx-auto text-center bg-gray-100">
      <div className="grid grid-cols-1 gap-8 mt-5 ">
        {faqData.map((item) => (
          <ExpansionPanel
            key={item.id}
            expanded={expandedItems.includes(item.id)}
            onChange={() => toggleExpandItem(item.id)}
            style={{
              width: '60%',
              margin: 'auto', // Center the Expansion Panel
              backgroundColor: '#0080ff',
              borderRadius: '10px',
              borderColor: '#e0e0e0',
              borderWidth: '2px',
            }}
          >
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              style={{
                backgroundColor: '#0080ff',
                borderRadius: '10px 10px 0 0',
                borderColor: '#e0e0e0',
                borderWidth: '2px',
              }}
            >
              <h3 className="text-xl font-semibold">{item.question}</h3>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              style={{
                backgroundColor: '#f5f5f5',
                borderRadius: '0 0 10px 10px',
                borderColor: '#e0e0e0',
                borderWidth: '2px',
              }}
            >
              <div className="text-gray-700">{item.answer}</div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </div>
    </div>
  );
  
};
const SupportPage: React.FC = () => {
  return (
    <div>
      <Header/>
      <FAQSection />
      <section className="py-12 text-center">
  <h2 className="text-2xl  mb-6 inline-block border-b-4 border-blue-500 pb-2">Terms & Conditions</h2>

  <div className="container mx-auto flex flex-col md:flex-row items-center">
    <div className="text-center md:text-left md:mr-20 md:ml-5 mb-5 md:mb-0">
      <div className="flex flex-col text-gray-700">
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
      <img src="/terms.png" alt="Image Description" className="max-w-full h-auto" />
    </div>
  </div>
</section>

      
 
<section className="py-12 text-center bg-gray-100">
  <h2 className="text-2xl  mb-6 inline-block border-b-4 border-blue-500 pb-2">Insurance Information</h2>

  <div className="container mx-auto flex flex-col md:flex-row items-center">

    <div className="hidden md:block">
      <img src="/insurance2.png" alt="Insurance Image" className="max-w-full h-auto" />
    </div>
    <div className="text-center md:text-left md:ml-10 mb-5 md:mb-0">
      <div className="flex flex-col text-gray-700">
        <p className="mb-8">
          We recommend and offer a comprehensive travel insurance package to all our passengers for the purpose of coverage against the consequences of accidents and illnesses during the journey, damage, and loss of luggage, voluntary health insurance during travel and stay abroad, insurance in case of trip cancellation, and insurance covering the costs of assistance and return of passengers to the place of departure in case of accidents and illnesses.
        </p>
        <p className="mb-8">
          According to the insurer's terms, the insurance contract is concluded exclusively before the start of the journey, no later than the day preceding the day of travel. Trip cancellation insurance is concluded when signing the travel contract or purchasing a non-refundable airline ticket. Exceptionally, trip cancellation insurance can be arranged within 48 hours of signing the travel contract or purchasing an airline ticket, but provided that the journey does not begin within the next 14 days. If trip cancellation insurance is arranged after the expiration of 48 hours from signing the travel contract or purchasing an airline ticket, there is no obligation for the insurer to pay compensation. Note: If you arrange the insurance contract independently, the conditions and deadlines for concluding the insurance contract may vary among insurance companies.
        </p>
      </div>
    </div>
  </div>
</section>
      
    </div>
  );
};

export default SupportPage;
