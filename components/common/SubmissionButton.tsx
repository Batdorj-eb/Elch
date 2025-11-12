'use client';
import { useState } from 'react';
import SubmissionPopup from '@/components/common/Submissions';

interface SubmissionButtonProps {
  // хэрэгтэй props-аар дамжуулж болно
}

export default function SubmissionButton(props: SubmissionButtonProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="text-white text-sm md:text-base font-medium rounded hover:bg-red-600 transition flex items-center justify-center w-full max-w-[366px]"
        style={{ 
          height: '40px', 
          backgroundColor: '#FF3336' 
        }}
      >
        Санал илгээх
      </button>

      {isPopupOpen && <SubmissionPopup onClose={() => setIsPopupOpen(false)} />}
    </>
  );
}
