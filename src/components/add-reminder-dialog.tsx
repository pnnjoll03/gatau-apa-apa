"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Reminder } from "@/types/reminder"

interface AddReminderDialogProps {
    isOpen: boolean
    onClose: () => void
    onAddReminder: (reminder: Omit<Reminder, "id">) => void
    selectedDate: Date
}

export function AddReminderDialog({ isOpen, onClose, onAddReminder, selectedDate }: AddReminderDialogProps) {
    const [title, setTitle] = useState("")
    const [priority, setPriority] = useState<number>(1) // Default ke angka 1 agar tidak "" (string kosong)
    const [description, setDescription] = useState("")
    const [startTime, setStartTime] = useState("09:00")
    const [endTime, setEndTime] = useState("10:00")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const reminderDate = new Date(selectedDate)

        const [startHour, startMinute] = startTime.split(":").map(Number)
        reminderDate.setHours(startHour, startMinute)

        const [endHour, endMinute] = endTime.split(":").map(Number)
        const endDate = new Date(reminderDate)
        endDate.setHours(endHour, endMinute)

        onAddReminder({
            title,
            priority, // Tidak lagi ada kemungkinan string kosong
            description,
            date: reminderDate.toISOString(),
            endDate: endDate.toISOString(),
        })

        setTitle("")
        setPriority(1) // Reset ke angka default agar tetap valid
        setDescription("")
        setStartTime("09:00")
        setEndTime("10:00")

        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-gradient-to-b from-slate-900 via  to-gray-400 rounded-lg text-customGray">
                <DialogHeader>
                    <DialogTitle>Add Reminder</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4 bg-gradient-to-b from-slate-900 via bg-blue-700 to-gray-400 rounded-md px-2 text-customGray">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Event / Kegiatan</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Meeting with team"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="priority">Priority / Prioritas</Label>
                            <Input
                                id="priority"
                                type="number"
                                min={1}
                                max={10}
                                value={priority}
                                onChange={(e) => setPriority(Number(e.target.value))}
                                placeholder="Set your priority event"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description / Deskripsi</Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Discuss project timeline and goals"
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="start-time">Start Time</Label>
                                <Input
                                    id="start-time"
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Input
                                    id="end-time"
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => {
                                        if (e.target.value < startTime) {
                                            setEndTime(startTime)
                                        } else {
                                            setEndTime(e.target.value)
                                        }
                                    }}
                                    min={startTime}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit">Add Reminder</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
