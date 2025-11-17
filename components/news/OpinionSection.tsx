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

  // Fetch approved submissions - MAX 3
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${API_URL}/submissions/approved?limit=3`);
        
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        } else {
          console.error('Response not OK:', response.status);
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
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
  };

  return (
    <section>
      {/* Header */}
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

      {/* Submissions Grid - MAX 3 */}
      {!loading && submissions.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {submissions.map((submission) => (
              <Link
                key={submission.id}
                href={`/submissions/${submission.id}`}
                className="group cursor-pointer bg-[#FFF7EF] p-4 lg:p-6 block hover:shadow-md transition"
              >
                {/* Author */}
                <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#C8C8C8]">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">
                    {submission.name[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2F2F2F]">
                      {submission.name}
                    </p>
                  </div>
                </div>
                
                {/* Content */}
                <div className="py-4">
                  <h3 className="text-base lg:text-lg font-bold text-[#2F2F2F] leading-snug group-hover:text-red-500 transition line-clamp-2">
                    {submission.title}
                  </h3>
                  <p className="text-[#2F2F2F] text-xs lg:text-sm line-clamp-3 mt-2">
                    {getSubmissionExcerpt(submission.content)}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex justify-between gap-2 text-zinc-600 border-t border-[#C8C8C8] pt-2">
                  <span className="font-medium text-[#2F2F2F] text-xs">
                    Иргэний санал
                  </span>
                  <time className="text-zinc-600 flex items-center gap-1 text-xs">
                    <Image src={time} alt="" width={14} height={14} />
                    {getTimeAgo(submission.created_at)}
                  </time>
                </div>
              </Link>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            {/* Санал илгээх */}
            <SubmissionButton 
              buttonText="Санал илгээх"
              buttonClass="bg-red-500 text-white px-6 py-2.5 hover:bg-red-600 transition-colors font-medium text-sm w-full sm:w-auto"
            />
            
            {/* Дэлгэрэнгүй үзэх */}
            <Link
              href="/submissions"
              className="px-6 py-2.5 bg-white text-red-500 border border-red-500 text-sm font-medium hover:bg-red-50 transition text-center w-full sm:w-auto"
            >
              Дэлгэрэнгүй үзэх
            </Link>
          </div>
        </>
      )}

      {/* Empty state */}
      {!loading && submissions.length === 0 && (
        <div className="text-center py-12 bg-gray-50">
          <p className="text-gray-600 mb-4">Одоогоор санал байхгүй байна</p>
          <SubmissionButton 
            buttonText="Эхний санал илгээх"
            buttonClass="bg-red-500 text-white px-6 py-3 hover:bg-red-600 transition-colors font-medium"
          />
        </div>
      )}
    </section>
  );
};

export default OpinionSection;