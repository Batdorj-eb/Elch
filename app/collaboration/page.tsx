// app/collaboration/page.tsx

import React from 'react';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import BreakingNewsBanner from '@/components/news/BreakingNewsBanner';
import { getBreakingNews } from '@/lib/api';

export const metadata = {
  title: 'Хамтран ажиллах - ELCH News',
  description: 'ELCH News-тэй хамтран ажиллах боломжууд',
};

export default async function CollaborationPage() {
  const breakingNews = await getBreakingNews();

  return (
    <div className="min-h-screen bg-[#FFF1E5]">
      <header>
        <BreakingNewsBanner articles={breakingNews} />
        <Header />
        <NavigationBar />
      </header>

      <main className="max-w-[1270px] mx-auto px-4 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16">
        {/* Section 1: Талбарт хамтран ажиллах */}
        <section className="mb-12 md:mb-16">
        <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2F2F2F] pb-3 border-b-4 border-[#FF3336] inline-block">
            Хамтран ажиллах
        </h2>
                {/* Introduction Text */}
        <div className="m-12 md:mb-16">
          <p className="text-sm md:text-base leading-relaxed text-[#2F2F2F]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel.
          </p>
        </div>
        </div>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2F2F2F] mb-6 pb-3 border-l-4 border-[#FF3336] pl-4">
            Төлбөртэй мэдээ байршуулах
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-[#2F2F2F] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
          </p>

          <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/collaboration/field-work.jpg"
              alt="Талбарт хамтран ажиллах"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Section 2: Баннер байршуулах */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2F2F2F] mb-6 pb-3 border-l-4 border-[#FF3336] pl-4">
            Баннер байршуулах
          </h2>
          
          <p className="text-sm md:text-base leading-relaxed text-[#2F2F2F] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
          </p>

          <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/collaboration/banner-placement.jpg"
              alt="Баннер байршуулах"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Section 3: Контент хамтран бүтээх */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#2F2F2F] mb-6 pb-3 border-l-4 border-[#FF3336] pl-4">
            Контент хамтран бүтээх
          </h2>
          
          <p className="text-sm md:text-base leading-relaxed text-[#2F2F2F] mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.
          </p>

          <div className="relative w-full h-[250px] md:h-[350px] lg:h-[450px] bg-gray-200 rounded-lg overflow-hidden">
            <Image
              src="/collaboration/content-creation.jpg"
              alt="Контент хамтран бүтээх"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="p-6 md:p-8 lg:p-10 rounded-lg shadow-sm text-center">
          <h3 className="text-xl md:text-2xl font-bold text-[#2F2F2F] mb-4">
            Бидэнтэй хамтран ажиллахыг хүсч байна уу?
          </h3>
          <p className="text-sm md:text-base text-zinc-600 mb-6">
            Дэлгэрэнгүй мэдээлэл авах, санал хүсэлт илгээхийг хүсвэл бидэнтэй холбогдоорой.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#FF3336] text-white px-6 md:px-8 py-3 rounded-lg hover:bg-red-600 transition font-medium text-sm md:text-base"
          >
            Холбоо барих
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}