// app/about/page.tsx

import React from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import { getBreakingNews } from '@/lib/api';

export const metadata = {
  title: 'Бидний тухай - ELCH News',
  description: 'ELCH News редакцийн баг болон бидний тухай мэдээлэл',
};

// Team members data
const teamMembers = [
  {
    id: 1,
    name: 'Ш.Адяамаа',
    position: 'Ерөнхий эрхлэгч',
    image: '/team/member1.jpg',
  },
  {
    id: 2,
    name: 'Г.Бавуудорж',
    position: 'Дэд эрхлэгч',
    image: '/team/member2.jpg',
  },
  {
    id: 3,
    name: 'А.Гантуяа',
    position: 'Редактор',
    image: '/team/member3.jpg',
  },
  {
    id: 4,
    name: 'С.Булгантамир',
    position: 'Сэтгүүлч',
    image: '/team/member4.jpg',
  },
  {
    id: 5,
    name: 'Ж.Дамбынхишгээ',
    position: 'Зургалаа',
    image: '/team/member5.jpg',
  },
  {
    id: 6,
    name: 'У.Хүрэлсүх',
    position: 'Администратор',
    image: '/team/member6.jpg',
  },
];

export default async function AboutPage() {
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
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2F2F2F] mb-4 pb-4 border-b-4 border-[#FF3336] inline-block">
            Бидний тухай
          </h1>
        </div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-16 mb-12 md:mb-16">
          {/* Featured Image */}
          <div className="lg:col-span-2">
            <div className="relative w-full lg:w-[773px] h-[180px] md:h-[300px] lg:h-[400px] bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="/about/featured.jpg"
                alt="About ELCH News"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Description Text */}
          <div className="lg:col-span-1">
            <div className="prose prose-sm md:prose-base lg:prose-lg max-w-none text-[#2F2F2F]">
              <p className="leading-relaxed mb-4 text-[11px] lg:text-[18px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
              </p>
            </div>
          </div>
        </div>
          <div className='text-black mb-20'>
            <p className="leading-relaxed mb-4 text-[11px] lg:text-[18px]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
              </p>
              <p className="leading-relaxed mb-4 text-[11px] lg:text-[18px]">
                In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. <strong className="font-bold">Cras dapibus. Vivamus elementum</strong> semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur temu ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. <strong className="font-bold">Maecenas tempus, tellus eget</strong> condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.
              </p>
          </div>
        {/* Team Section */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#2F2F2F] mb-6 md:mb-8 pb-3 border-l-4 border-[#FF3336] pl-4">
            Багийн гишүүд
          </h2>

            {/* Team Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {teamMembers.map((member) => (
                <div
                key={member.id}
                className="bg-[#FFF7EF] rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                {/* Member Image */}
                <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px] bg-gray-200">
                    <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    />
                </div>

                {/* Member Info */}
                <div className="p-3 md:p-4 lg:p-6">
                    <h3 className="text-base md:text-lg lg:text-xl font-bold text-[#2F2F2F] mb-1">
                    {member.name}
                    </h3>
                    <p className="text-xs md:text-sm lg:text-base text-zinc-600">
                    {member.position}
                    </p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}