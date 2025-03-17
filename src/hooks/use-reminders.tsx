"use client"

import { useState, useEffect } from "react"
import type { Reminder } from "@/types/reminder"

export function useReminders() {
    const [reminders, setReminders] = useState<Reminder[]>([])

    useEffect(() => {
        const savedReminders = localStorage.getItem("reminders")
        if (savedReminders) {
            try {
                setReminders(JSON.parse(savedReminders))
            } catch (error) {
                console.error("Failed to parse reminders:", error)
                localStorage.removeItem("reminders")
            }
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("reminders", JSON.stringify(reminders))
    }, [reminders])

    const addReminder = (reminderData: Omit<Reminder, "id">) => {
        const newReminder: Reminder = {
            ...reminderData,
            id: Date.now().toString(),
        }

        setReminders((prev) => [...prev, newReminder])
    }

    const deleteReminder = (id: string) => {
        setReminders((prev) => prev.filter((reminder) => reminder.id !== id))
    }

    const updateReminder = (id: string, data: Partial<Omit<Reminder, "id">>) => {
        setReminders((prev) => prev.map((reminder) => (reminder.id === id ? { ...reminder, ...data } : reminder)))
    }

    return {
        reminders,
        addReminder,
        deleteReminder,
        updateReminder,
    }
}

