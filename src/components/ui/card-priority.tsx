export function CardPriority({ priority }: { priority: "Low" | "Medium" | "High" }) {
    const colorClass =
      priority === "High" ? "text-red-500 font-bold" :
      priority === "Medium" ? "text-yellow-500" :
      priority === "Low" ? "text-green-500" :
      "text-gray-500"; // Default warna
  
    return <span className={`text-xs px-2 py-1 rounded ${colorClass}`}>{priority}</span>;
  }
  