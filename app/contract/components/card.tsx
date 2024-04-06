// ElectricityCard.tsx
'use client'
import React from 'react';

interface ElectricityCardProps {
  price: number;
  energyTokens: number;
  sellerAddress: string;
  buyerAddress: string;
  id: number;
}

const ElectricityCard: React.FC<ElectricityCardProps> = ({ price, energyTokens, sellerAddress, buyerAddress, id }) => {
  const handleBid = () => {
    // Handle bid action
    console.log(`Bid for offer ${id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-64 mb-4 mr-4">
      <div className="text-xl font-semibold mb-2">Price: {price} ETH</div>
      <div className="text-sm text-gray-600 mb-2">Energy Tokens Available: {energyTokens}</div>
      <hr className="my-2" />
      <div className="text-sm text-gray-600 mb-2">Seller Address: {sellerAddress}</div>
      <div className="text-sm text-gray-600 mb-4">Buyer Address: {buyerAddress}</div>
      <div className="mt-auto">
        <button onClick={handleBid} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full">
          Bid
        </button>
      </div>
    </div>
  );
};

export default ElectricityCard;
