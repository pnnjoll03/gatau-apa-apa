interface Task {
    task: string;
    priority: number;
  }
  
  interface ToDoListProps {
    tasks: Task[];
  }
  
  const ToDoList: React.FC<ToDoListProps> = ({ tasks }) => {
    return (
      <div className="mt-4">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Event</th>
              <th className="border border-gray-300 px-4 py-2">Priority</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 px-4 py-2">{task.task}</td>
                <td className="border border-gray-300 px-4 py-2 text-center">{task.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default ToDoList;
  