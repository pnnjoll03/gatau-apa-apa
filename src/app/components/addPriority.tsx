"use client";
import { useState } from "react";

interface AddPriorityProps {
  addTask: (task: { task: string; priority: number }) => void;
}

const AddPriority: React.FC<AddPriorityProps> = ({ addTask }) => {
  const [priority, setPriority] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    if (task.trim() === "") {
      alert("Tulis sesuatu untuk membuat jadwal!");
      return;
    }

    const priorityNumber = Number(priority);
    if (!priority || isNaN(priorityNumber) || priorityNumber < 1 || priorityNumber > 10) {
      alert("Tambahkan tingkat prioritas (angka 1 sampai 10)");
      return;
    }

    addTask({ task, priority: priorityNumber });
    setTask("");
    setPriority("");
  };

  return (
    <div>
      <input
        className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        type="text"
        placeholder="Tambahkan Tugas..."
      />
      <input
        className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        type="number"
        min="1"
        max="10"
        placeholder="1-10"
      />
      <button
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
        onClick={handleSubmit}
      >
        Tambah Prioritas
      </button>
    </div>
  );
};

export default AddPriority;
