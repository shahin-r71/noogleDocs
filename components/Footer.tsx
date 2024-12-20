import React from 'react'

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer className="bg-blue-500 text-white py-6">
      <div className="container mx-auto px-4 text-lg text-center">
        <p>&copy; {currentYear} NoogleDocs. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer