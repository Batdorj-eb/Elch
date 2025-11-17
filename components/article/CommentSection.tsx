// components/article/CommentSection.tsx

'use client';

import React, { useState } from 'react';
import type { ArticleComment } from '@/lib/types';
import { formatDate, formatDateShort } from '@/lib/utils';
import Like from '@/public/icons/like.svg';
// If using Next.js Image for raster images, import it:
import Image from 'next/image';
import Share from '@/public/icons/share.svg'; 
import Dislike from '@/public/icons/dislike.svg';

interface CommentSectionProps {
  articleId: number;
  comments: ArticleComment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId, comments: initialComments }) => {
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [comments, setComments] = useState(initialComments);
  
  // Reply state
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyUserName, setReplyUserName] = useState('');
  const [replyText, setReplyText] = useState('');
  const [isReplySubmitting, setIsReplySubmitting] = useState(false);

  // Main comment submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim() || !commentText.trim()) {
      setSubmitMessage('Нэр болон сэтгэгдэл оруулна уу.');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/article/${articleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: userName,
          content: commentText,
        }),
      });

      if (response.ok) {
        setSubmitMessage('✅ Сэтгэгдэл амжилттай илгээгдлээ!');
        setUserName('');
        setCommentText('');
        
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setSubmitMessage('❌ Алдаа гарлаа. Дахин оролдоно уу.');
      }
    } catch (error) {
      console.error('Comment submission error:', error);
      setSubmitMessage('❌ Серверийн алдаа гарлаа.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reply submit
  const handleReplySubmit = async (e: React.FormEvent, parentId: number) => {
    e.preventDefault();
    
    if (!replyUserName.trim() || !replyText.trim()) {
      return;
    }

    setIsReplySubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/article/${articleId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_name: replyUserName,
          content: replyText,
          parent_id: parentId, 
        }),
      });

      if (response.ok) {
        setReplyUserName('');
        setReplyText('');
        setReplyingTo(null);
        
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Reply submission error:', error);
    } finally {
      setIsReplySubmitting(false);
    }
  };

  const handleLike = async (commentId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${commentId}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        setComments(comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          return comment;
        }));
      }
    } catch (error) {
      console.error('Like error:', error);
    }
  };

  // Toggle reply form
  const toggleReply = (commentId: number) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyUserName('');
      setReplyText('');
    } else {
      setReplyingTo(commentId);
    }
  };

  return (
    <div className="mt-8 lg:mt-12 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <h2 className="text-xl lg:text-2xl font-bold text-[#2F2F2F] mb-6">
        Сэтгэгдэл ({comments.length})
      </h2>

      {/* Main Comment Form */}
      <div className="mb-8">
        {submitMessage && (
          <div className={`mb-4 p-3 text-sm ${
            submitMessage.includes('✅') 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Нэр оруулах"
              className="px-3 py-2.5 bg-white border border-gray-200 text-sm text-[#2F2F2F] placeholder-gray-400 focus:outline-none focus:border-red-500"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Сэтгэгдэл"
            className="w-full px-3 py-2.5 bg-white border border-gray-200 text-sm text-[#2F2F2F] placeholder-gray-400 resize-none focus:outline-none focus:border-red-500"
            rows={4}
            disabled={isSubmitting}
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-2.5 bg-[#EF4444] text-white text-sm font-medium hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Илгээж байна...' : 'Илгээх'}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-sm">
          Одоогоор сэтгэгдэл байхгүй байна
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-[#C8C8C8]">
              {/* Main Comment */}
              <div className="flex gap-3 p-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-[#2F2F2F] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {comment.user_name[0].toUpperCase()}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* User & Date */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-sm text-[#EF4444]">
                      {comment.user_name}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>

                  {/* Comment Text */}
                  <p className="text-sm text-[#2F2F2F] leading-relaxed mb-3">
                    {comment.content}
                  </p>

                  {/* Actions */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <button
                      onClick={() => toggleReply(comment.id)}
                      className="flex items-center gap-1 hover:text-red-500 transition"
                    >
                      <div className='flex gap-1 items-center'>
                        <Image src={Share} alt='dsdsd'/>
                        <span>Хариулах</span>
                      </div>
                    </button>
                    <button 
                      onClick={() => handleLike(comment.id)}
                     
                    >
                    <div className='flex gap-1 items-center'>
                      <Image src={Like} alt='dsdsd'/>
                      <span>{comment.likes}</span>
                    </div>
                    </button>
                    <button>
                    <div className='flex gap-1 items-center'>
                      <Image src={Dislike} alt='dsdsd'/>
                      <span>0</span>
                    </div>
                    </button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 p-3 border-l-2 border-red-500">
                      <p className="text-xs text-gray-600 mb-3">
                        <span className="font-semibold text-[#EF4444]">{comment.user_name}</span>-д хариулах
                      </p>
                      <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="space-y-2">
                        <input
                          type="text"
                          value={replyUserName}
                          onChange={(e) => setReplyUserName(e.target.value)}
                          placeholder="Таны нэр"
                          className="w-full px-3 py-2 bg-white border border-gray-200 text-sm focus:outline-none focus:border-red-500"
                          disabled={isReplySubmitting}
                          required
                        />
                        <textarea
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Хариулт бичих..."
                          className="w-full px-3 py-2 bg-white border border-gray-200 text-sm resize-none focus:outline-none focus:border-red-500"
                          rows={3}
                          disabled={isReplySubmitting}
                          required
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isReplySubmitting}
                            className="px-4 py-1.5 bg-[#EF4444] text-white text-xs font-medium hover:bg-red-600 transition disabled:bg-gray-400"
                          >
                            {isReplySubmitting ? 'Илгээж байна...' : 'Илгээх'}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleReply(comment.id)}
                            className="px-4 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium hover:bg-gray-300 transition"
                          >
                            Болих
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3 p-3">
                          {/* Reply Avatar */}
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                            {reply.user_name[0].toUpperCase()}
                          </div>

                          {/* Reply Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2 mb-1">
                              <span className="font-bold text-xs text-[#2F2F2F]">
                                {reply.user_name}
                              </span>
                              <span className="text-xs text-gray-400">
                                {formatDateShort(reply.created_at)}
                              </span>
                            </div>
                            <p className="text-xs text-[#2F2F2F] leading-relaxed">
                              {reply.content}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More (if needed) */}
      {comments.length > 0 && (
        <div className="text-center mt-6">
          <button className="text-sm text-gray-500 hover:text-red-500 transition">
            Бүх сэтгэгдэл харах
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentSection;