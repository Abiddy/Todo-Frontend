'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CreateTaskButton } from '@/components/CreateTaskButton';

const API_URL = 'http://localhost:3001';

const COLORS = [
  { id: 'red', value: '#EF4444' },
  { id: 'orange', value: '#F97316' },
  { id: 'yellow', value: '#EAB308' },
  { id: 'green', value: '#22C55E' },
  { id: 'blue', value: '#3B82F6' },
  { id: 'indigo', value: '#6366F1' },
  { id: 'purple', value: '#A855F7' },
  { id: 'pink', value: '#EC4899' },
  { id: 'brown', value: '#92400E' },
];

export default function TaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].id);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError('Please enter a task title');
      return;
    }

    if (trimmedTitle.length > 200) {
      setError('Task title is too long. Please keep it under 200 characters.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: trimmedTitle,
          color: selectedColor,
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create task. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please check your connection and try again.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button 
      onClick={() => router.back()}
      className="text-zinc-400 hover:text-zinc-100 transition-colors"
    >
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M25.3333 16H6.66667M6.66667 16L16 25.3333M6.66667 16L16 6.66667" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm text-blue-400">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex. Brush your teeth"
            className={`w-full p-4 rounded-lg bg-zinc-800 text-zinc-100 placeholder:text-zinc-400 
              ${error ? 'border-2 border-red-500' : ''}`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="space-y-2 pb-5">
          <label className="text-sm text-blue-400">
            Color
          </label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(color => (
              <button
                type="button"
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`w-8 h-8 rounded-full relative hover:ring-2 ring-white ring-offset-2 ring-offset-zinc-900
                  ${selectedColor === color.id ? 'ring-2' : ''}`}
                style={{ backgroundColor: color.value }}
              />
            ))}
          </div>
        </div>

        <CreateTaskButton 
          text="Add Task" 
          type="submit" 
          isLink={false}
        />
      </form>
    </div>
  );
} 