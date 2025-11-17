'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, TrendingUp, Clock } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await getSearchSuggestions(query);
        setSuggestions(results);
      } catch (error) {
        console.error('Search error:', error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onClose();
      setQuery('');
    }
  };

  const handleSuggestionClick = (slug: string) => {
    router.push(`/articles/${slug}`);
    onClose();
    setQuery('');
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal - ✅ ТОМСГОСОН */}
      <div className="fixed top-0 left-0 right-0 z-[9999] p-3 sm:p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <form onSubmit={handleSearch} className="relative">
            <div className="flex items-center gap-3 p-4 sm:p-5 border-b">
              <Search className="w-6 h-6 sm:w-7 sm:h-7 text-zinc-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Мэдээ хайх... (жишээ: Монгол Улс, эдийн засаг)"
                className="flex-1 text-base sm:text-xl outline-none text-zinc-800 placeholder:text-zinc-400"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-2 hover:bg-zinc-100 rounded-full transition"
                >
                  <X className="w-5 h-5 text-zinc-500" />
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-full transition"
              >
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>
          </form>

          {/* Suggestions - ✅ ТОМСГОСОН */}
          <div className="max-h-[70vh] overflow-y-auto">
            {isLoading && (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-zinc-200 border-t-red-500 mb-3"></div>
                <p className="text-zinc-500">Хайж байна...</p>
              </div>
            )}

            {!isLoading && suggestions.length > 0 && (
              <div className="p-3">
                <div className="px-4 py-2 text-sm text-zinc-500 flex items-center gap-2 font-medium">
                  <TrendingUp className="w-4 h-4" />
                  {suggestions.length} үр дүн олдлоо
                </div>
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.slug)}
                    className="w-full px-4 py-3.5 text-left hover:bg-red-50 transition rounded-lg group"
                  >
                    <div className="flex items-start gap-3">
                      <Search className="w-5 h-5 text-zinc-400 flex-shrink-0 mt-0.5 group-hover:text-red-500 transition" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-zinc-800 line-clamp-2 group-hover:text-red-500 transition mb-1">
                          {suggestion.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded font-medium">
                            {suggestion.category}
                          </span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(suggestion.publishedAt).toLocaleDateString('mn-MN')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!isLoading && query.length >= 2 && suggestions.length === 0 && (
              <div className="p-12 text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
                <h3 className="text-lg font-medium text-zinc-800 mb-2">
                  Үр дүн олдсонгүй
                </h3>
                <p className="text-zinc-500">
                  "{query}" гэсэн түлхүүр үгтэй мэдээ олдсонгүй
                </p>
              </div>
            )}

            {query.length === 0 && (
              <div className="p-12 text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-zinc-300" />
                <h3 className="text-lg font-medium text-zinc-800 mb-2">
                  Мэдээ хайх
                </h3>
                <p className="text-zinc-500">
                  Сонирхож буй сэдвээрээ хайлт хийнэ үү
                </p>
              </div>
            )}
          </div>

          {/* Footer hint */}
          <div className="border-t p-3 sm:p-4 bg-zinc-50">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white border rounded text-[10px] font-mono">Enter</kbd>
                Бүрэн хайлт
              </span>
              <span className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-white border rounded text-[10px] font-mono">ESC</kbd>
                Хаах
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchModal;