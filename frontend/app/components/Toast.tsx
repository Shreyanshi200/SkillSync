'use client';

import { useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  duration?: number;
};

export default function Toast({ message, type = 'success', duration = 3000 }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 px-6 py-3 rounded shadow-lg text-white z-50 transition-opacity
        ${type === 'success' ? 'bg-green-600' : 'bg-red-500'}`}
    >
      {message}
    </div>
  );
}
