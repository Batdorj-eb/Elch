// app/submissions/page.tsx

import React from 'react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import time from '@/public/icons/time.svg';
import SubmissionButton from '@/components/common/SubmissionButton';

interface Submission {
  id: number;
  name: string;
  title: string;
  content: string;
  created_at: string;
}

async function getSubmissions(): Promise<Submission[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  try {
    const response = await fetch(`${API_URL}/submissions/approved?limit=50`, {
      cache: 'no-store'
    });
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return [];
  }
}

export const metadata = {
  title: 'Иргэдийн санал | Ардын элч | ELCH News',
  description: 'Иргэдийн санал хүсэлт',
};

export default async function SubmissionsListPage() {
  const submissions = await getSubmissions();

  // Цагийн форматчлуур
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const published = new Date(dateString);
    const diffMs = now.getTime() - published.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} өдрийн өмнө`;
    if (diffHours > 0) return `${diffHours} цагийн өмнө`;
    if (diffMins > 0) return `${diffMins} минутын өмнө`;
    return 'Саяхан';
  };

  // Submission content excerpt
  const getSubmissionExcerpt = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    if (text.length > 150) {
      return text.substring(0, 150) + '...';
    }
    return text;
  };

  return (
    <div className="min-h-screen bg-[#FFF1E5] flex flex-col">
      <Header />
      <NavigationBar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-12">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-[7px] h-[32px] bg-red-500" />
              <h1 className="text-3xl lg:text-4xl font-bold text-[#2F2F2F]">
                Ардын Элч
              </h1>
            </div>
            <SubmissionButton 
              buttonText="Санал илгээх"
              buttonClass="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors font-medium"
            />
          </div>
          <p className="text-gray-600 ml-11">
            Иргэдийн санал хүсэлт ({submissions.length})
          </p>
        </div>

        {/* Submissions Grid */}
        {submissions.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {submissions.map((submission) => (
                <Link
                  key={submission.id}
                  href={`/submissions/${submission.id}`}
                  className="group cursor-pointer bg-[#FFF7EF] p-6 block hover:shadow-md transition rounded-lg"
                >
                  {/* Author */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b" style={{ borderColor: '#C8C8C8' }}>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                      <div className="w-full h-full flex items-center justify-center bg-red-500 text-white font-bold text-sm">
                        {submission.name[0].toUpperCase()}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-[#2F2F2F]">
                        {submission.name}
                      </p>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className='py-4'>
                    <h3 className="lg:text-lg font-bold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2">
                      {submission.title}
                    </h3>

                    <p className="text-[#2F2F2F] line-clamp-3 overflow-hidden text-ellipsis mt-2" style={{ fontSize: '12px' }}>
                      {getSubmissionExcerpt(submission.content)}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between gap-2 text-zinc-600 border-t border-[#C8C8C8] pt-2">
                    <span 
                      className="font-medium text-[#2F2F2F]"
                      style={{ fontSize: '12px' }}
                    >
                      Иргэний санал
                    </span>
                    <time 
                      className="text-zinc-600 flex items-center gap-1"
                      style={{ fontSize: '12px' }}
                    >
                      <Image src={time} alt="" width={14} height={14} />
                      {getTimeAgo(submission.created_at)}
                    </time>
                  </div>
                </Link>
              ))}
            </div>

            {/* Center button at bottom */}
            <div className="flex justify-center mt-8">
              <SubmissionButton 
                buttonText="Санал илгээх"
                buttonClass="bg-red-500 text-white px-8 py-3 rounded hover:bg-red-600 transition-colors font-medium text-lg"
              />
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4 text-lg">Одоогоор санал байхгүй байна</p>
            <SubmissionButton 
              buttonText="Эхний санал илгээх"
              buttonClass="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors font-medium"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}