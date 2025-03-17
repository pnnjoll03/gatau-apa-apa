"use client";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";

// Tambahkan tipe props
interface AddTaskProps {
  addTask: (task: { task: string; priority: number }) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ addTask }) => {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");

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
    <div className="flex gap-2">
      <input
        className="border border-gray-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        type="text"
        placeholder="Tambahkan Tugas..."
      />
      <input
        className="border border-gray-300 px-4 py-2 w-20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-center"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        type="number"
        min="1"
        max="10"
        placeholder="1-10"
      />
      <button
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        onClick={handleSubmit}
      >
        Add <FaCirclePlus size={18} />
      </button>
    </div>
  );
};

export default AddTask;
