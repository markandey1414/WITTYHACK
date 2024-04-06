// ElectricityPage.tsx

import React from 'react';
import dynamic from 'next/dynamic';


// Load the ElectricityCard component dynamically
const ElectricityCard = dynamic(() => import('./card'));

const ElectricityPage: React.FC = () => {
  // Dummy data for demonstration
  const electricityOffers = [
    { price: 0.5, energyTokens: 100, sellerAddress: '0x1234...', buyerAddress: '0xabcd...', id: 1 },
    { price: 0.7, energyTokens: 150, sellerAddress: '0x5678...', buyerAddress: '0xefgh...', id: 2 },
    { price: 0.6, energyTokens: 120, sellerAddress: '0x9abc...', buyerAddress: '0ijkl...', id: 3 },
    // Add more dummy data as needed
  ];

  return (
    <>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Electricity Offers</h1>
      <div className="flex flex-wrap">
        {electricityOffers.map((offer) => (
          <ElectricityCard
            key={offer.id}
            price={offer.price}
            energyTokens={offer.energyTokens}
            sellerAddress={offer.sellerAddress}
            buyerAddress={offer.buyerAddress}
            id={offer.id} // Pass the id prop here
          />
        ))}
      </div>
    </div>
    </>
  );
};

export default ElectricityPage;
