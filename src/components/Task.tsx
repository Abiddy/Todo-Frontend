'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { getColorValue } from '@/constants/colors';

interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  color: string;
  onToggle: () => void;
  onDelete: () => void;
}

export function Task({ id, title, completed, color, onToggle, onDelete }: TaskProps) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/task/${id}`);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg group cursor-pointer hover:bg-zinc-700"
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={onToggle}
          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
            ${completed 
              ? `bg-[${getColorValue(color)}] border-[${getColorValue(color)}]` 
              : `border-[${getColorValue(color)}] hover:border-opacity-75`
            }`}
          style={{
            backgroundColor: completed ? getColorValue(color) : 'transparent',
            borderColor: getColorValue(color)
          }}
        >
          {completed && (
            <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.43059 0.342154L4.09865 4.67409L1.61618 2.19162L0.780273 3.02753L4.09865 6.3459L9.26649 1.17806L8.43059 0.342154Z" fill="white"/>
            </svg>
          )}
        </button>
        
        <span className={`text-white ${completed ? 'line-through opacity-50' : ''}`}>
          {title}
        </span>
      </div>

      <button 
        onClick={handleDelete}
        className="h-5 w-5 visible group-hover:visible text-white hover:text-red-500 transition-colors"
      >
        <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.20214 4.98547H6.87158V10.5073H8.20214V4.98547Z" fill="currentColor"/>
          <path d="M5.46239 4.98547H4.13184V10.5073H5.46239V4.98547Z" fill="currentColor"/>
          <path d="M12.478 2.16712C12.4754 2.03061 12.4295 1.89846 12.3469 1.78975C12.2642 1.68104 12.1492 1.6014 12.0184 1.56232C11.9596 1.53782 11.8974 1.52252 11.8339 1.51696H8.28678C8.1525 1.07791 7.88082 0.693554 7.51174 0.420471C7.14265 0.147388 6.69564 0 6.23651 0C5.77738 0 5.33038 0.147388 4.96129 0.420471C4.5922 0.693554 4.32053 1.07791 4.18625 1.51696H0.639107C0.580679 1.51814 0.522686 1.52729 0.46674 1.54418H0.45162C0.313182 1.58701 0.193338 1.67547 0.11163 1.79515C0.0299214 1.91483 -0.00883041 2.05866 0.00169348 2.20319C0.0122174 2.34771 0.071396 2.48441 0.169579 2.59099C0.267763 2.69757 0.399158 2.76774 0.542339 2.79006L1.25298 12.5334C1.26382 12.7750 1.37009 13.0015 1.54769 13.1668C1.72529 13.3321 1.96032 13.4235 2.20362 13.4235H10.2694C10.5127 13.4235 10.7477 13.3321 10.9253 13.1668C11.1029 13.0015 11.2092 12.7750 11.22 12.5334L11.9277 2.79914C12.0802 2.77797 12.22 2.70232 12.3212 2.58615C12.4223 2.46999 12.478 2.32006 12.478 2.16712ZM6.23651 1.21456C6.4506 1.21458 6.65839 1.28239 6.82873 1.40938C6.99906 1.53637 7.12214 1.71636 7.17989 1.92078H5.29314C5.35088 1.71636 5.47397 1.53637 5.6443 1.40938C5.81464 1.28239 6.02242 1.21458 6.23651 1.21456ZM10.2694 12.2089H2.20362L1.52037 2.73165H10.9527L10.2694 12.2089Z" fill="currentColor"/>
        </svg>
      </button>
    </div>
  );
} 