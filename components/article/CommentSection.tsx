// components/article/CommentSection.tsx

'use client';

import React, { useState } from 'react';
import type { ArticleComment } from '@/lib/types';
import { formatDate, formatDateShort } from '@/lib/utils';

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
  
  // 🆕 Reply state
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

  // 🆕 Reply submit
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
        // Reset reply form
        setReplyUserName('');
        setReplyText('');
        setReplyingTo(null);
        
        // Reload to show new reply
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

  // 🆕 Toggle reply form
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
    <div className="mt-8 lg:mt-12 p-6 lg:p-10">
      <h2 className="text-2xl lg:text-3xl font-bold text-black mb-6">
        Сэтгэгдэл ({comments.length})
      </h2>

      {/* Main Comment Form */}
      <div className="mb-8 pb-8">
        {submitMessage && (
          <div className={`mb-4 p-4 rounded ${
            submitMessage.includes('✅') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Нэр"
              className="w-full px-4 py-3 border border-neutral-300 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none text-black bg-[#FFF7EF]"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Сэтгэгдэл..."
              className="w-full px-4 py-3 border border-neutral-300 focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none outline-none  bg-[#FFF7EF] text-black"
              rows={4}
              disabled={isSubmitting}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-red-500 text-white font-medium hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed float-right lg:w-[163px]"
          >
            {isSubmitting ? 'Илгээж байна...' : 'Илгээх'}
          </button>
        </form>
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Одоогоор сэтгэгдэл байхгүй байна. Та эхний сэтгэгдлийг үлдээгээрэй!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-neutral-200 pb-6 last:border-0">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {comment.user_name[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#2F2F2F]">{comment.user_name}</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-500 text-sm">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-[#2F2F2F] mb-3 leading-relaxed">{comment.content}</p>
                  
                  {/* 🆕 Action buttons */}
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => handleLike(comment.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition"
                    >
                      👍 <span>{comment.likes}</span>
                    </button>
                    
                    {/* 🆕 Reply button */}
                    <button
                      onClick={() => toggleReply(comment.id)}
                      className="text-sm text-gray-500 hover:text-red-500 transition font-medium"
                    >
                      💬 Хариулах
                    </button>
                  </div>

                  {/* 🆕 Reply Form (toggle) */}
                  {replyingTo === comment.id && (
                    <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded">
                      <h4 className="text-sm font-semibold mb-3 text-[#2F2F2F]">
                        {comment.user_name}-д хариулах
                      </h4>
                      <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="space-y-3">
                        <div>
                          <input
                            type="text"
                            value={replyUserName}
                            onChange={(e) => setReplyUserName(e.target.value)}
                            placeholder="Таны нэр"
                            className="w-full px-3 py-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none"
                            disabled={isReplySubmitting}
                            required
                          />
                        </div>
                        <div>
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Таны хариулт..."
                            className="w-full px-3 py-2 border border-neutral-300 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none outline-none"
                            rows={3}
                            disabled={isReplySubmitting}
                            required
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            disabled={isReplySubmitting}
                            className="px-4 py-2 bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                          >
                            {isReplySubmitting ? 'Илгээж байна...' : 'Хариулт илгээх'}
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleReply(comment.id)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-400 transition"
                          >
                            Болих
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Existing Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4 ml-6 pl-4 border-l-2 border-neutral-200 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm flex-shrink-0">
                            {reply.user_name[0].toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm text-[#2F2F2F]">{reply.user_name}</span>
                              <span className="text-gray-500 text-xs">
                                {formatDateShort(reply.created_at)}
                              </span>
                            </div>
                            <p className="text-sm text-[#2F2F2F]">{reply.content}</p>
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
    </div>
  );
};

export default CommentSection;