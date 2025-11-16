'use client';

import React, { useEffect, useState } from 'react';
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const OpinionSection: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        console.log('Fetching submissions from:', `${API_URL}/submissions/approved?limit=10`);
        const response = await fetch(`${API_URL}/submissions/approved?limit=10`);
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Submissions data:', data);
          setSubmissions(data);
        } else {
          console.error('Response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

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
    // HTML tags устгах
    const text = content.replace(/<[^>]*>/g, '');
    if (text.length > 150) {
      return text.substring(0, 150) + '...';
    }
    return text;
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center gap-4">
          <div className="w-[7px] h-[22px] bg-red-500" />
          <span className="text-2xl font-bold text-[#2F2F2F]">
            Ардын Элч
          </span>
        </h2>
      </div>
      {/* Loading state */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          <p className="mt-4 text-gray-600">Уншиж байна...</p>
        </div>
      )}
      {/* Иргэдийн санал - мэдээний дизайнаар */}
      {!loading && submissions.length > 0 && (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {submissions.map((submission) => (
              <Link
                key={submission.id}
                href={`/submissions/${submission.id}`}
                className="group cursor-pointer bg-[#FFF7EF] p-6 block hover:shadow-md transition"
              >
                {/* Зохиогч / Илгээгч */}
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
                
                {/* Гарчиг болон агуулга */}
                <div className='py-4'>
                  <h3 className="lg:text-lg font-bold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2">
                    {submission.title}
                  </h3>

                  <p className="text-[#2F2F2F] line-clamp-3 overflow-hidden text-ellipsis mt-2" style={{ fontSize: '12px' }}>
                    {getSubmissionExcerpt(submission.content)}
                  </p>
                </div>

                {/* Footer - Категори болон цаг */}
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
        <div className="flex justify-center mt-4">
          <SubmissionButton 
            buttonText="Санал илгээх"
            buttonClass="bg-red-500 text-white px-6 py-2.5 hover:bg-red-600 transition-colors font-medium text-sm w-full max-w-[366px]"
          />
        </div>

          {/* Дэлгэрэнгүй үзэх товч */}
          {submissions.length >= 3 && (
            <div className="flex justify-center mt-6">
              <Link
                href="/submissions"
                className="w-[366px] px-6 py-2.5 lg:py-3 bg-red-500 text-white text-sm lg:text-base font-medium rounded hover:bg-red-600 transition text-center block"
              >
                Дэлгэрэнгүй үзэх
              </Link>
            </div>
          )}
        </>
      )}

      {!loading && submissions.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">Одоогоор санал байхгүй байна</p>
          <SubmissionButton 
            buttonText="Санал илгээх"
            buttonClass="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition-colors font-medium"
          />
        </div>
      )}
    </section>
  );
};

export default OpinionSection;