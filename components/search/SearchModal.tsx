'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp } from 'lucide-react';
import { getSearchSuggestions } from '@/lib/api';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Fetch suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      const results = await getSearchSuggestions(query);
      setSuggestions(results);
      setIsLoading(false);
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery('');
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (slug: string) => {
    router.push(`/articles/${slug}`);
    onClose();
    setQuery('');
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-0 left-0 right-0 z-[9999] p-4 sm:p-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center gap-3 p-4 border-b">
              <Search className="w-6 h-6 text-zinc-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Мэдээ хайх..."
                className="flex-1 text-lg outline-none text-zinc-800 placeholder:text-zinc-400"
              />
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
          </form>

          {/* Suggestions */}
          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading && (
              <div className="p-8 text-center text-zinc-500">
                Хайж байна...
              </div>
            )}

            {!isLoading && suggestions.length > 0 && (
              <div className="p-2">
                <div className="px-4 py-2 text-sm text-zinc-500 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Санал
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.slug)}
                    className="w-full px-4 py-3 text-left hover:bg-zinc-50 transition text-zinc-800 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-zinc-400 flex-shrink-0" />
                      <span className="line-clamp-1">{suggestion.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!isLoading && query.length >= 2 && suggestions.length === 0 && (
              <div className="p-8 text-center text-zinc-500">
                Үр дүн олдсонгүй
              </div>
            )}

            {query.length === 0 && (
              <div className="p-8 text-center text-zinc-500">
                <Search className="w-12 h-12 mx-auto mb-3 text-zinc-300" />
                <p>Мэдээ хайхын тулд бичнэ үү</p>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t p-3 bg-zinc-50">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Enter дарж хайна</span>
              <span>ESC дарж хаана</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;