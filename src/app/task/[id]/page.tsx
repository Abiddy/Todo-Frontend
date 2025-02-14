'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { use } from "react";
import { COLORS } from '@/constants/colors';
import { ColorId } from '@/constants/colors';

const API_URL = 'http://localhost:3001';

export default function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [selectedColor, setSelectedColor] = useState<ColorId>(COLORS[0].id);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`${API_URL}/tasks/${id}`);
        if (!response.ok) {
          throw new Error('Task not found');
        }
        const task = await response.json();
        setTitle(task.title);
        setSelectedColor(task.color);
        setLoading(false);
      } catch (error) {
        setError('Failed to load task');
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

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
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
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
        setError(data.error || 'Failed to update task. Please try again.');
      }
    } catch (error) {
      setError('Something went wrong. Please check your connection and try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
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
          Update Task
        </button>
      </form>
    </div>
  );
} 