'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

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

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: title.trim(),
          color: selectedColor,
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to create task');
      }
    } catch (error) {
      setError('Failed to create task');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      {/* Header */}
      <div className="w-full max-w-2xl">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100"
        >
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 24L12 16L20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-8 space-y-6">
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

        <div className="space-y-2">
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

        <button 
          type="submit"
          className="w-full p-4 bg-blue-500 text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Add Task
        </button>
      </form>
    </main>
  );
} 