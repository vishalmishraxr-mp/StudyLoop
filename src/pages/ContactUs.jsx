import React from 'react';

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#111927] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-xl p-6 sm:p-8 shadow-xl text-white">
        <h1 className="text-3xl font-semibold mb-4 text-center">Contact Us</h1>
        <p className="mb-2">If you have any questions or need support, feel free to reach out.</p>
        <p>Email: <a href="mailto:support@studypage.com" className="text-yellow-400 hover:underline">support@studypage.com</a></p>
        <p>Phone: +1 (91) 9910010101</p>
      </div>
    </div>
  );
}

