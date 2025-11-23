// app/contact/page.tsx

import React from 'react';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import { getBreakingNews } from '@/lib/api';
import building from "@/public/building.png"

export const metadata = {
  title: 'Холбоо барих - ELCH News',
  description: 'ELCH News редакцийн холбоо барих мэдээлэл, хаяг, утас, имэйл',
};

export default async function ContactPage() {
  const breakingNews = await getBreakingNews();

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      <header>
        <BreakingNewsBanner articles={breakingNews} />
        <Header />
        <NavigationBar />
      </header>

      <main className="max-w-[1325px] mx-auto px-4 md:px-12 lg:px-16 xl:px-24 py-8 md:py-12 lg:py-16">
        {/* Page Title */}
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2F2F2F] mb-4 pb-4 border-b-4 border-[#FF3336] inline-block">
            Холбоо барих
          </h1>
        </div>

    {/* Main Content - Image and Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 items-start">
          {/* Building Image */}
          <div className="lg:col-span-2 w-full">
            <div className="relative w-full h-[240px] md:h-[300px] lg:h-[438px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={building}
                alt="ELCH News Office Building"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6 md:space-y-8">
            {/* Address */}
            <div className="">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#FF3336]" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-2">
                    Хаяг:
                  </h3>
                  <p className="text-sm md:text-base text-[#2F2F2F] leading-relaxed">
                    Улаанбаатар хот 14193, Сүхбаатар дүүрэг, 11-р хороо, Их сургуулийн гудамж, AB Center, 5-р давхар, 105 тоот
                  </p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-[#FF3336]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-2">
                    И-мэйл:
                  </h3>
                  <a 
                    href="mailto:elchnmedee@gmail.com"
                    className="text-sm md:text-base text-[#FF3336] hover:underline"
                  >
                    elchmedee@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-[#FF3336]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-3">
                    Утас:
                  </h3>
                  <a 
                    href="tel:77700777"
                    className="inline-block w-full bg-[#FF3336] text-white text-center py-3 px-6 hover:bg-red-600 transition font-medium text-sm md:text-base"
                  >
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    7770-0777
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p">
              <h3 className="text-lg md:text-xl font-bold text-[#2F2F2F] mb-3">
                Ажлын цаг:
              </h3>
              <div className="space-y-2 text-sm md:text-base text-[#2F2F2F]">
                <p>Даваа - Баасан: 09:00 - 18:00</p>
                <p>Бямба, Ням: Амралт</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section (Optional) */}
        <div className="mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2F2F2F] mb-6 text-center">
            Байршил
          </h2>
          <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            {/* Google Maps Embed - Replace with your actual map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2674.3779876234567!2d106.91234567890123!3d47.91666789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDU1JzAwLjAiTiAxMDbCsDU0JzQ0LjQiRQ!5e0!3m2!1sen!2smn!4v1234567890123!5m2!1sen!2smn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="ELCH News Office Location"
            />
          </div>
        </div>

        {/* Contact Form (Optional) */}
        <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2F2F2F] mb-6 text-center">
            Санал хүсэлт илгээх
          </h2>
          <form className="p-6 md:p-8 rounded-lg shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2F2F2F] mb-2">
                  Нэр
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3336] focus:border-transparent"
                  placeholder="Таны нэр"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2F2F2F] mb-2">
                  И-мэйл
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3336] focus:border-transparent"
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-[#2F2F2F] mb-2">
                Гарчиг
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3336] focus:border-transparent"
                placeholder="Санал хүсэлтийн гарчиг"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#2F2F2F] mb-2">
                Мессеж
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF3336] focus:border-transparent resize-none"
                placeholder="Таны санал хүсэлт..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF3336] text-white py-3 px-6 rounded-lg hover:bg-red-600 transition font-medium text-base md:text-lg"
            >
              Илгээх
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}