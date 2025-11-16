// app/components/SubmissionForm.tsx
'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import type { SubmissionFormData, SubmissionResponse, SubmissionError } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface SubmissionFormProps {
  onSuccess?: () => void;
}

export default function SubmissionForm({ onSuccess }: SubmissionFormProps) {
  const [formData, setFormData] = useState<SubmissionFormData>({
    name: '',
    email: '',
    phone: '',
    title: '',
    content: ''
  });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim() || !formData.title.trim() || !formData.content.trim()) {
      setError('Нэр, гарчиг, санал заавал бөглөнө үү');
      return false;
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      setError('Email эсвэл утасны дугаар заавал бөглөнө үү');
      return false;
    }

    // Email валидацион
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Email буруу байна');
      return false;
    }

    // Монгол утасны дугаар (8 оронтой эсвэл 88-аар эхэлсэн)
    if (formData.phone && !/^[89]\d{7}$/.test(formData.phone.replace(/\s/g, ''))) {
      setError('Утасны дугаар буруу байна (жишээ: 99119911)');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData: SubmissionError = await response.json();
        throw new Error(errorData.error || 'Алдаа гарлаа');
      }

      const data: SubmissionResponse = await response.json();
      
      setSuccess(true);
      // Формыг цэвэрлэх
      setFormData({
        name: '',
        email: '',
        phone: '',
        title: '',
        content: ''
      });

      // 2 секундын дараа modal хаах (хэрэв onSuccess байвал)
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        // Standalone хуудас бол 5 секундын дараа success мессеж устгах
        setTimeout(() => setSuccess(false), 5000);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white text-[#000]">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Ардын элчид санал илгээх
        </h2>
        <p className="text-gray-600 mb-6">
          Таны санал, хүсэлт бидэнд чухал. Доорх формыг бөглөж илгээнэ үү.
        </p>

        {success && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            ✓ Таны санал амжилттай илгээгдлээ. Баярлалаа!
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            ✗ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Нэр */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Нэр <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Таны нэр"
              maxLength={200}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email <span className="text-gray-400 text-xs">(Email эсвэл утас нэг нь заавал)</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="example@email.com"
              maxLength={255}
            />
          </div>

          {/* Утас */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Утасны дугаар <span className="text-gray-400 text-xs">(Email эсвэл утас нэг нь заавал)</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="99119911"
              maxLength={50}
            />
          </div>

          {/* Гарчиг */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Гарчиг <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Саналын гарчиг / сэдэв"
              maxLength={255}
            />
          </div>

          {/* Санал */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Санал, хүсэлт <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-y"
              placeholder="Та санал, хүсэлтээ дэлгэрэнгүй бичнэ үү..."
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.content.length} тэмдэгт
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#EF4444] text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? 'Илгээж байна...' : 'Санал илгээх'}
          </button>
        </form>
      </div>
    </div>
  );
}