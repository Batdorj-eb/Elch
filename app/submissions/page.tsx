import React from 'react';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';
import Image from 'next/image';
import Link from 'next/link';
import time from '@/public/icons/time.svg';
import SubmissionButton from '@/components/common/SubmissionButton';
import { getSubmissions, Submission } from '@/lib/api'; 

export const metadata = {
  title: 'Иргэдийн санал | Ардын элч | ELCH News',
  description: 'Иргэдийн санал хүсэлт',
};

export default async function SubmissionsListPage() {
  const submissions = await getSubmissions();

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

  const getSubmissionExcerpt = (content: string) => {
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > 200 ? text.substring(0, 200) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-[#FFF1E5] flex flex-col">
      <Header />
      <NavigationBar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 pb-12 max-w-[1200px]">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-10 bg-red-500 rounded-sm" />
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#2F2F2F]">
                  Ардын Элч
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Иргэдийн санал хүсэлт
                </p>
              </div>
            </div>
            <SubmissionButton 
              buttonText="+ Санал илгээх"
              buttonClass="bg-red-500 text-white px-6 py-2.5 rounded-lg hover:bg-red-600 transition-colors font-medium text-sm shadow-sm"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-semibold text-[#2F2F2F]">{submissions.length}</span>
            <span>санал</span>
          </div>
        </div>

        {/* Submissions LIST */}
        {submissions.length > 0 ? (
          <div className="space-y-4">
            {submissions.map((s: Submission, index: number) => (
              <Link
                key={s.id}
                href={`/submissions/${s.id}`}
                className="group block  hover:bg-red-50 border border-gray-200 hover:border-red-300 transition-all duration-200"
              >
                {/* List Item */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex gap-4">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                            {s.name[0].toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-[#2F2F2F] text-sm">
                              {s.name}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 float-right">
                            <Image src={time} alt="time" width={14} height={14} />
                            <time>{getTimeAgo(s.created_at)}</time>
                          </div>
                        </div>
                        
                
                      </div>

                      {/* Title & Content */}
                      <div className="mb-3">
                        <h3 className="text-lg lg:text-xl font-bold text-[#2F2F2F] group-hover:text-red-500 transition mb-2 line-clamp-2">
                          {s.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {getSubmissionExcerpt(s.content)}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200">
                          Иргэний санал
                        </span>
                        <span className="text-sm text-red-500 font-medium group-hover:underline">
                          Дэлгэрэнгүй үзэх →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Load More / Bottom CTA */}
            <div className="text-center pt-8 border-t border-gray-200">
              <p className="text-gray-600 mb-4">Танд санал, хүсэлт байна уу?</p>
              <SubmissionButton 
                buttonText="Санал илгээх"
                buttonClass="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm"
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border-2 border-dashed border-gray-300">
            <div className="max-w-md mx-auto px-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2F2F2F] mb-2">
                Одоогоор санал байхгүй байна
              </h3>
              <p className="text-gray-600 mb-6">
                Та эхний саналыг илгээж, иргэдийн дуу хоолойг хүргээрэй
              </p>
              <SubmissionButton 
                buttonText="Эхний санал илгээх"
                buttonClass="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium shadow-sm"
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}