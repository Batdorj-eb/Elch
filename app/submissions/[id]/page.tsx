// app/submissions/[id]/page.tsx

import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import NavigationBar from '@/components/layout/NavigationBar';
import Footer from '@/components/layout/Footer';

interface Submission {
  id: number;
  name: string;
  title: string;
  content: string;
  created_at: string;
}

async function getSubmission(id: string): Promise<Submission | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  try {
    const response = await fetch(`${API_URL}/submissions/approved`, {
      cache: 'no-store'
    });
    
    if (!response.ok) return null;
    
    const submissions: Submission[] = await response.json();
    const submission = submissions.find(s => s.id === parseInt(id));
    
    return submission || null;
  } catch (error) {
    console.error('Error fetching submission:', error);
    return null;
  }
}

// Next.js 15: params is now a Promise
export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getSubmission(id);

  if (!submission) {
    notFound();
  }

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF1E5] flex flex-col">
      <Header />
      <NavigationBar />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 pb-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <a href="/" className="hover:text-red-500">Нүүр</a>
          <span className="mx-2">/</span>
          <a href="/submissions" className="hover:text-red-500">Ардын элч</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{submission.title}</span>
        </nav>

        {/* Article Container */}
        <article className="bg-white rounded-lg shadow-lg p-6 lg:p-10">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Иргэний санал
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {submission.title}
          </h1>

          {/* Meta Information */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
            {/* Author */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold text-lg">
                {submission.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900">{submission.name}</p>
                <p className="text-sm text-gray-600">Иргэн</p>
              </div>
            </div>

            {/* Date */}
            <div className="ml-auto text-right">
              <p className="text-sm text-gray-600">{formatDate(submission.created_at)}</p>
              <p className="text-xs text-gray-500">{getTimeAgo(submission.created_at)}</p>
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed whitespace-pre-wrap"
              style={{ fontSize: '16px', lineHeight: '1.8' }}
            >
              {submission.content}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <a
                href="/submissions"
                className="text-red-500 hover:text-red-600 font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Бүх санал харах
              </a>
            </div>
          </div>
        </article>

        {/* Call to Action */}
        <div className="mt-8 bg-gray-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Танд ч санал байна уу?
          </h3>
          <p className="text-gray-600 mb-4">
            Та өөрийн санал, хүсэлтээ илгээж болно
          </p>
          <a
            href="/"
            className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition font-medium"
          >
            Санал илгээх
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Next.js 15: generateMetadata params is also a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const submission = await getSubmission(id);

  if (!submission) {
    return {
      title: 'Санал олдсонгүй | ELCH News',
    };
  }

  return {
    title: `${submission.title} | Ардын элч | ELCH News`,
    description: submission.content.substring(0, 160),
  };
}