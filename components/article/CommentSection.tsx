// components/article/CommentSection.tsx
// ============================================

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ThumbsUp, MessageCircle } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
  replies: number;
}

const CommentSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'popular' | 'newest'>('popular');
  const [commentText, setCommentText] = useState('');

  const comments: Comment[] = [
    {
      id: '1',
      author: 'Oyuka',
      avatar: 'https://i.pravatar.cc/150?img=1',
      date: '2024 оны 10 сарын 09',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.',
      likes: 4,
      replies: 1
    },
    {
      id: '2',
      author: 'Boldy',
      avatar: 'https://i.pravatar.cc/150?img=2',
      date: '2024 оны 10 сарын 08',
      text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      likes: 2,
      replies: 0
    },
    {
      id: '3',
      author: 'Temuulen',
      avatar: 'https://i.pravatar.cc/150?img=3',
      date: '2024 оны 10 сарын 08',
      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      likes: 8,
      replies: 2
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Comment:', commentText);
    setCommentText('');
  };

  return (
    <section className="mt-8 lg:mt-10 pt-8 lg:pt-10 border-t border-neutral-200">
      <h2 className="text-xl lg:text-2xl font-bold text-zinc-800 mb-6">
        Сэтгэгдэл (15)
      </h2>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-neutral-200">
        <button
          onClick={() => setActiveTab('popular')}
          className={`pb-3 text-sm lg:text-base font-medium transition ${
            activeTab === 'popular'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-zinc-600 hover:text-zinc-800'
          }`}
        >
          Эрэмбэлэх
        </button>
        <button
          onClick={() => setActiveTab('newest')}
          className={`pb-3 text-sm lg:text-base font-medium transition ${
            activeTab === 'newest'
              ? 'text-red-500 border-b-2 border-red-500'
              : 'text-zinc-600 hover:text-zinc-800'
          }`}
        >
          Шинэ эхэндээ
        </button>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Сэтгэгдэл үлдээх..."
          className="w-full px-4 py-3 text-sm lg:text-base border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
          rows={4}
        />
        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="px-6 py-2 bg-red-500 text-white text-sm lg:text-base font-medium rounded hover:bg-red-600 transition"
          >
            Илгээх
          </button>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 lg:gap-4">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden shrink-0">
              <Image
                src={comment.avatar}
                alt={comment.author}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm lg:text-base font-semibold text-zinc-800">
                  {comment.author}
                </span>
                <span className="text-xs lg:text-sm text-zinc-500">
                  {comment.date}
                </span>
              </div>

              <p className="text-sm lg:text-base text-zinc-700 mb-3 leading-relaxed">
                {comment.text}
              </p>

              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-xs lg:text-sm text-zinc-600 hover:text-red-500 transition">
                  <ThumbsUp className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>{comment.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-xs lg:text-sm text-zinc-600 hover:text-red-500 transition">
                  <MessageCircle className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span>Хариулах {comment.replies > 0 && `(${comment.replies})`}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full mt-6 px-6 py-3 bg-red-500 text-white text-sm lg:text-base font-medium rounded hover:bg-red-600 transition">
        Цааш үзэх
      </button>
    </section>
  );
};

export default CommentSection;