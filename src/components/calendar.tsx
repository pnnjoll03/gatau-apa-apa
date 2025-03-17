"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AddReminderDialog } from "@/components/add-reminder-dialog"
import { ReminderItem } from "@/components/reminder-item"
import { useReminders } from "@/hooks/use-reminders"

export function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [isAddReminderOpen, setIsAddReminderOpen] = useState(false)

    const { reminders, addReminder, deleteReminder } = useReminders()

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()

    const prevMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }

    const goToToday = () => {
        const today = new Date()
        setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1))
        setSelectedDate(today)
    }

    const handleDateClick = (day: number) => {
        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    }

    const isToday = (day: number) => {
        const today = new Date()
        return (
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        )
    }

    const isSelected = (day: number) => {
        return (
            day === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear()
        )
    }

    const filteredReminders = reminders
        .filter((reminder) => {
            const reminderDate = new Date(reminder.date)
            return (
                reminderDate.getDate() === selectedDate.getDate() &&
                reminderDate.getMonth() === selectedDate.getMonth() &&
                reminderDate.getFullYear() === selectedDate.getFullYear()
            )
        })
        .sort((a, b) => b.priority - a.priority) // Sorting by priority

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const renderCalendarDays = () => {
        const days = []

        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 md:h-14 p-1 border border-border/50"></div>)
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const hasReminders = reminders.some((reminder) => {
                const reminderDate = new Date(reminder.date)
                return (
                    reminderDate.getDate() === day &&
                    reminderDate.getMonth() === currentDate.getMonth() &&
                    reminderDate.getFullYear() === currentDate.getFullYear()
                )
            })

            days.push(
                <div
                    key={day}
                    className={`h-10 md:h-14 p-1 border border-border/50 relative cursor-pointer transition-colors
            ${isSelected(day) ? "bg-primary/10" : ""}
            ${isToday(day) ? "font-bold" : ""}
            hover:bg-primary/5`}
                    onClick={() => handleDateClick(day)}
                >
                    <span
                        className={`text-sm ${isToday(day) ? "bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center" : ""}`}
                    >
                        {day}
                    </span>
                    {hasReminders && <div className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-primary"></div>}
                </div>,
            )
        }

        return days
    }

    return (
        <div className="space-y-6 py-2 px-1 bg-gradient-to-b from-slate-800 via-[#8C9DA3]  to-[#BDC6C3] rounded-xl">
            <div>
                <img src="/img/pemandangan.png" alt="Pemandangan"/>
            </div>
            <div className="flex justify-between items-center">
                
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="bg-white hover:bg-gray-400 text-customBlue" onClick={prevMonth}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl text-customBlue font-bold">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h2>
                    <Button variant="outline" size="icon" className="bg-white hover:bg-gray-400 text-customBlue" onClick={nextMonth}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={goToToday} className="text-customBlue bg-white hover:bg-gray-400">
                        Today
                    </Button>
                    <Button onClick={() => setIsAddReminderOpen(true)} size="sm" className="bg-slate-800 hover:bg-slate-700">
                        <Plus className="h-4 w-4 mr-1" /> Add Reminder
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-0 text-customBlue">
                {dayNames.map((day) => (
                    <div key={day} className="h-10 flex items-center justify-center font-medium text-sm text-customBlue">
                        {day}
                    </div>
                ))}
                {renderCalendarDays()}
            </div>

            <Card className="p-4 bg-gradient-to-t from-[#8C9DA3]  to-[#BDC6C3]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-600">
                        {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </h3>
                    <Button variant="outline" size="sm"  className="bg-slate-600 hover:bg-slate-700 text-white" onClick={() => setIsAddReminderOpen(true)}>
                        <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>
                </div>

                {filteredReminders.length > 0 ? (
                    <div className="space-y-3">
                        {filteredReminders.map((reminder) => (
                            <ReminderItem key={reminder.id} reminder={reminder} onDelete={deleteReminder} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground text-gray-600">
                        <Clock className="mx-auto h-12 w-12 mb-2 opacity-20 " />
                        <p>No reminders for this day</p>
                        <p className="text-sm">Click Add to create a new reminder</p>
                    </div>
                )}
            </Card>

            <AddReminderDialog
                isOpen={isAddReminderOpen}
                onClose={() => setIsAddReminderOpen(false)}
                onAddReminder={addReminder}
                selectedDate={selectedDate}
            />
        </div>
    )
}
