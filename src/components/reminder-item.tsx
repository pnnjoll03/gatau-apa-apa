"use client";

import { formatTime } from "@/lib/utils";
import type { Reminder } from "@/types/reminder";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { CardPriority } from "@/components/ui/card-priority";


interface ReminderItemProps {
  reminder: Reminder;
  onDelete: (id: string) => void;
}


export function ReminderItem({ reminder, onDelete }: ReminderItemProps) {
  const startDate = new Date(reminder.date);
  const endDate = new Date(reminder.endDate);

  return (
    <div className="p-3 border rounded-md bg-card hover:bg-accent/50 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            {reminder.title}
            {reminder.priority && <CardPriority priority={reminder.priority} />}
          </h4>
          <div className="text-sm text-muted-foreground flex items-center mt-1">
            <span>
              {formatTime(startDate)} - {formatTime(endDate)}
            </span>
          </div>
          {reminder.description && <p className="text-sm mt-2">{reminder.description}</p>}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive"
          onClick={() => onDelete(reminder.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
