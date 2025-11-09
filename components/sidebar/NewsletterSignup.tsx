'use client';

import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="bg-[#FFE4CC] p-8 text-white">
      <div className="flex justify-center gap-3 mb-4">
        <h2 className="text-2xl font-bold text-[#FF3336] text-center">
          Мэдээлэл авах
        </h2>
      </div>
      
      <p className="text-sm  mb-6 text-[#2F2F2F]">
         7 Хоногийн мэдээлэл, нийтлэл, өдөр бүрийн шинэчлэл хүлээн авна уу.
      </p>

      {isSubmitted ? (
        <div className="bg-white text-red-500 rounded-lg p-4 text-center font-medium">
          ✓ Амжилттай бүртгэгдлээ!
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="И-мэйл хаяг"
            className="w-full px-4 py-3 bg-white text-[#2F2F2F] placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-white" 
            required
          />
          
          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#FF3336] text-white font-medium hover:bg-red-50 transition"
          >
            Илгээх
          </button>
        </form>
      )}

      <p className="text-xs text-red-100 mt-4">
        *By clicking, you agree to our Terms of Service and Privacy Policy
      </p>
    </section>
  );
};

export default NewsletterSignup;