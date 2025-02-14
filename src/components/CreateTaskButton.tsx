'use client';

import Link from 'next/link';

interface CreateTaskButtonProps {
  text?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  isLink?: boolean;
}

export function CreateTaskButton({ 
  text = 'Create Task', 
  onClick, 
  type = 'button',
  isLink = true 
}: CreateTaskButtonProps) {
  const className = "w-full p-4 bg-[#4AA7E3] text-white rounded-lg hover:bg-opacity-90 transition-colors text-center flex items-center justify-center gap-2 font-semibold mb-8";

  if (isLink) {
    return (
      <Link href="/task" className={className}>
        {text}
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M8 1.6C4.4712 1.6 1.6 4.4712 1.6 8C1.6 11.5288 4.4712 14.4 8 14.4C11.5288 14.4 14.4 11.5288 14.4 8C14.4 4.4712 11.5288 1.6 8 1.6ZM8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0ZM12 7.2H8.8V4H7.2V7.2H4V8.8H7.2V12H8.8V8.8H12V7.2Z"
            fill="currentColor"
          />
        </svg>
      </Link>
    );
  }

  return (
    <button 
      type={type}
      onClick={onClick}
      className={className}
    >
      {text}
      <svg 
        width="16" 
        height="16" 
        viewBox="0 0 16 16" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M8 1.6C4.4712 1.6 1.6 4.4712 1.6 8C1.6 11.5288 4.4712 14.4 8 14.4C11.5288 14.4 14.4 11.5288 14.4 8C14.4 4.4712 11.5288 1.6 8 1.6ZM8 0C12.4184 0 16 3.5816 16 8C16 12.4184 12.4184 16 8 16C3.5816 16 0 12.4184 0 8C0 3.5816 3.5816 0 8 0ZM12 7.2H8.8V4H7.2V7.2H4V8.8H7.2V12H8.8V8.8H12V7.2Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
} 