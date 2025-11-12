'use client';
import { useState } from 'react';

interface SubmissionPopupProps {
  onClose: () => void;
}

export default function SubmissionPopup({ onClose }: SubmissionPopupProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', title: '', content: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://72.60.195.81:5000/api/submissions', { // VPS IP
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_id: 7, // "Ардын элч" category id
          ...form,
        }),
      });

      if (!res.ok) throw new Error('Failed to submit');

      setMessage('Амжилттай илгээв');
      setForm({ name: '', email: '', phone: '', title: '', content: '' });
      // Хүсвэл popup-ыг хааж болно
      // onClose();
    } catch (error) {
      console.error(error);
      setMessage('Алдаа гарлаа, дахин оролдоно уу');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 font-bold"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Санал илгээх</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Нэр"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="phone"
            placeholder="Утас"
            value={form.phone}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            name="title"
            placeholder="Гарчиг"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            name="content"
            placeholder="Агуулга"
            value={form.content}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition"
          >
            Илгээх
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
