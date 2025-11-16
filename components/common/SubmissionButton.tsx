// app/components/SubmissionButton.tsx
'use client';

import { useState } from 'react';
import SubmissionModal from './SubmissionModal';

interface SubmissionButtonProps {
  buttonText?: string;
  buttonClass?: string;
}

export default function SubmissionButton({ 
  buttonText = 'Санал илгээх',
  buttonClass = 'bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium'
}: SubmissionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className={buttonClass}
      >
        {buttonText}
      </button>

      <SubmissionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}