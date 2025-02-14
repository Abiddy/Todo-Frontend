'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Task } from '@/components/Task';
import { useEffect, useState } from 'react';

interface TaskType {
  id: string;
  title: string;
  completed: boolean;
  color: string;
}

const API_URL = 'http://localhost:3001';

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  const handleToggle = async (id: string) => {
    try {

      const task = tasks.find(task => task.id === id)
      if (!task) return;

      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (response.ok) {
        setTasks(tasks.map(t => 
          t.id === id ? { ...t, completed: !t.completed } : t
        ));
      }
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTasks(tasks.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      {/* Header */}
      <div className="flex items-center gap-2 text-2xl font-bold">
        <Image 
          src="/rocket-icon.svg" 
          alt="Todo App Logo" 
          width={24} 
          height={24} 
        />
        <span className="text-[#4AA7E3]">Todo</span>
        <span className="text-[#8B5CF6]">App</span>
      </div>

      {/* Create Task Button */}
      <Link 
        href="/task"
        className="w-full max-w-2xl mt-8 p-4 bg-[#4AA7E3] text-white rounded-lg hover:bg-opacity-90 transition-colors text-center"
      >
        Create Task
      </Link>

      {/* Tasks Section */}
      <div className="w-full max-w-2xl mt-8">
        <div className="flex justify-between mb-4">
          <div className="text-[#4AA7E3]">
            Tasks <span className="bg-[#4AA7E3] text-white rounded-full px-2 py-0.5 text-sm">{tasks.length}</span>
          </div>
          <div className="text-[#8B5CF6]">
            Completed <span className="text-gray-400">{tasks.filter(t => t.completed).length} de {tasks.length}</span>
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-2">
          {tasks.map(task => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              completed={task.completed}
              color={task.color}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDelete(task.id)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
