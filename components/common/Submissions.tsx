import { useState } from 'react';
import { submitSubmission } from '@/lib/api';

export default function SubmissionPopup({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', title: '', content: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitSubmission(form);
    setMessage(success ? 'Амжилттай илгээв' : 'Алдаа гарлаа');
    if (success) setForm({ name: '', email: '', phone: '', title: '', content: '' });
  };

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <button onClick={onClose}>X</button>
        <h2>Санал илгээх</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Нэр" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
          <input name="phone" placeholder="Утас" value={form.phone} onChange={handleChange} />
          <input name="title" placeholder="Гарчиг" value={form.title} onChange={handleChange} required />
          <textarea name="content" placeholder="Агуулга" value={form.content} onChange={handleChange} required />
          <button type="submit">Илгээх</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
