'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import ElectricityPage from './components/electricityCard';

const Navbar: React.FC = () => {
  const { user } = useUser();
  const [showPopup, setShowPopup] = useState(false);
  const [sellerPrice, setSellerPrice] = useState('');
  const [energyTokens, setEnergyTokens] = useState('');
  const [sellerAddress, setSellerAddress] = useState('');

  const handleSellClick = () => {
    setShowPopup(true);
  };

  const handleSellConfirm = () => {
    // You can perform actions here when the user confirms the sell
    console.log('Seller Price:', sellerPrice);
    console.log('Energy Tokens:', energyTokens);
    console.log('Seller Address:', sellerAddress);
    // Reset state and close popup
    setSellerPrice('');
    setEnergyTokens('');
    setSellerAddress('');
    setShowPopup(false);
  };

  return (
    <>
      <nav className="bg-gray-800 py-4 px-8 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.svg" alt="Logo" className="h-8 w-8 mr-2" />
          <span className="text-white text-lg font-semibold">Your Logo</span>
        </div>
        <div className="flex-grow flex justify-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-4">Buy</button>
          <button onClick={handleSellClick} className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md">Sell</button>
        </div>
        <Link href="/api/auth/logout">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">Logout</button>
        </Link>
      </nav>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Sell Popup</h2>
            <div className="mb-4">
              <label htmlFor="sellerPrice" className="block text-gray-700">Seller Price:</label>
              <input type="number" id="sellerPrice" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" value={sellerPrice} onChange={(e) => setSellerPrice(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="energyTokens" className="block text-gray-700">Energy Tokens Available:</label>
              <input type="number" id="energyTokens" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" value={energyTokens} onChange={(e) => setEnergyTokens(e.target.value)} />
            </div>
            <div className="mb-4">
              <label htmlFor="sellerAddress" className="block text-gray-700">Seller Address:</label>
              <input type="text" id="sellerAddress" className="block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200" value={sellerAddress} onChange={(e) => setSellerAddress(e.target.value)} />
            </div>
            <div>
              <button onClick={handleSellConfirm} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md mr-2">Confirm</button>
              <button onClick={() => setShowPopup(false)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md">Cancel</button>
            </div>
          </div>
        </div>
      )}

      <ElectricityPage />
    </>
  );
};

export default Navbar;
