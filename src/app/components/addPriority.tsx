import React, { useState } from 'react'

export const addPriority = () => {
    const[priority, setPriority] = useState("");

    const handleSubmit = () => {
        if (priority.trim() === "") {
          alert("Tambahkan tingkat prioritas anda angka 1 sampai 10");
          return;
        }
        addTask(task);
        setTask("");
      };

  return (
    <div>addPriority</div>
  )
}
