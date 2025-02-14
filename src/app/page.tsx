'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Task } from '@/components/Task';
import { CreateTaskButton } from '@/components/CreateTaskButton';
import { useEffect, useState } from 'react';
import emptyIcon from 'public/empty.png';

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
        // This is important to update the state to view changes immediately
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
    <>
      {/* Reusable Button Component */}
    
        <CreateTaskButton />
      

      {/* Task Summaries */}
      <div className="space-y-6">
        <div className="flex justify-between mb-4">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-[#4AA7E3]">Tasks</span>
            <span className="bg-zinc-800 py-1 px-3 rounded-full text-white text-sm font-normal">
              {tasks.length}
            </span>
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-[#8B5CF6]">Completed</span>
            <span className="bg-zinc-800 py-1 px-3 rounded-full text-white text-sm font-normal">
              {tasks.filter(t => t.completed).length} de {tasks.length}
            </span>
          </div>
        </div>
         

         {tasks.length === 0 ?  <div className="border-t border-zinc-800 mb-10"></div> : ''}
      

        {/* Task List and Empty State View */}
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-white mt-10">
            <Image src={emptyIcon} alt="No tasks" width={70} height={70} />
            <p className="mt-4 font-semibold text-zinc-300">You don't have any tasks registered yet.</p>
            <p className="text-zinc-400 mt-5">Create tasks and organize your to-do items.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <Task
                key={task.id}
                {...task}
                onToggle={() => handleToggle(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
