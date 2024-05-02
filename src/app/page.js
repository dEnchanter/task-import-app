"use client"

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { TaskCard } from "@/components/TaskCard";
import { fetchAllTasks } from "@/services/api";
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('In Progress');
  const cancelRef = useRef(false);
  const batchSize = 4;

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedProgress = localStorage.getItem('progress');
    const savedStatus = localStorage.getItem('status');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      setProgress(Number(savedProgress));
      setStatus(savedStatus);
    } else {
      fetchTasks(); // Call fetchTasks if there's nothing in localStorage
    }
    
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('progress', JSON.stringify(progress));
    localStorage.setItem('status', status);
  }, [tasks, progress, status]);

  const fetchTasks = async () => {
    try {
      const allTasks = await fetchAllTasks();
      const totalBatches = Math.ceil(allTasks.length / batchSize);

      for (let batch = 0; batch < totalBatches; batch++) {

        await new Promise(resolve => setTimeout(resolve, 3000));

        if (cancelRef.current) {
          break;
        }

        const batchStart = batch * batchSize;
        const batchTasks = allTasks.slice(batchStart, batchStart + batchSize);
        setTasks(prevTasks => [...prevTasks, ...batchTasks]);
        setProgress((batch + 1) / totalBatches * 100);
      }

      if (!cancelRef.current) {
        setStatus('Completed');
      }
    } catch (error) {
      console.error('Failed to fetch tasks', error);
      setStatus('Failed to Load Tasks');
    }
  };

  const handleCancel = () => {
    cancelRef.current = true;
    setStatus('Canceled');
    setProgress(progress => progress);
  };

  return (
    <main className="container mx-auto p-4">
      <MaxWidthWrapper>
        <div className="w-full bg-gray-200 h-4 mt-4">
          <div className="bg-blue-500 h-4" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span>{progress.toFixed(0)}%</span>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" 
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
        <p>Status: {status}</p>
      </MaxWidthWrapper>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {tasks.map((task, index) => (
          <TaskCard key={`${task.id}-${index}`} task={task} />
        ))}
      </div>
    </main>
  );
}
