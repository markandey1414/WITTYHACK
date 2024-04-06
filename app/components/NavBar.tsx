import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { ConnectWallet } from "@thirdweb-dev/react";
import { ThirdwebProvider } from '@thirdweb-dev/react';
const Navbar = () => {
  
  const { user, error, isLoading } = useUser();

  return (
    <nav className="flex items-center justify-between bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 p-4">
      <div>
        <Link href="/">
          <span className="text-xl font-bold cursor-pointer">Logo</span>
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <Link href="/">
          <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">Home</span>
        </Link>
        <Link href="/explore">
          <span className="mx-4 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">Explore</span>
        </Link>
        {!isLoading && !error && user ? (
          <Link href="/contract">
            <span className="hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer">Buy Energy</span>
          </Link>
        ) : null}
      </div>
      <div>
        {!isLoading && !error && user ? (
          <>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              <ThirdwebProvider>
              <ConnectWallet /></ThirdwebProvider></button>
            <Link href="/api/auth/logout">
              <button className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
            </Link>
          </>
        ) : (
          <Link href="/api/auth/login">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
