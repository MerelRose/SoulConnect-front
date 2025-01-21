import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-5xl font-sans">Page Not Found</h2>
      <p className="text-lg font-sans mt-4">It looks like you've stumbled upon a page that doesn't exist.</p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5" onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default NotFound;