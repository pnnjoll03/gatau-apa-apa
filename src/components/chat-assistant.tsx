"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Loader2 } from "lucide-react"
import { useReminders } from "@/hooks/use-reminders"
import { generateRecommendations } from "@/lib/ai-service"

type Message = {
    id: string
    role: "user" | "assistant"
    content: string
}

export function ChatAssistant() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content:
                "Hello! I'm your AI assistant. I can recommend events for today or help you manage your calendar. What would you like to do?",
        },
    ])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const scrollAreaRef = useRef<HTMLDivElement>(null)
    const { reminders } = useReminders()

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!input.trim() || isLoading) return

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
        }

        setMessages((prev) => [...prev, userMessage])
        setInput("")
        setIsLoading(true)

        try {
            const today = new Date()
            const todayReminders = reminders.filter((reminder) => {
                const reminderDate = new Date(reminder.date)
                return (
                    reminderDate.getDate() === today.getDate() &&
                    reminderDate.getMonth() === today.getMonth() &&
                    reminderDate.getFullYear() === today.getFullYear()
                )
            })

            const response = await generateRecommendations(input, todayReminders)

            const assistantMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: response,
            }

            setMessages((prev) => [...prev, assistantMessage])
        } catch (error) {
            console.error("Error generating response:", error)

            const errorMessage: Message = {
                id: Date.now().toString(),
                role: "assistant",
                content: "I'm sorry, I couldn't process your request. Please try again later.",
            }

            setMessages((prev) => [...prev, errorMessage])
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="h-[600px] flex flex-col p-4 bg-gradient-to-t from-[#8C9DA3]  to-[#BDC6C3]">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5" />
                    AI Assistant
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-[460px] px-4" ref={scrollAreaRef}>
                    <div className="space-y-4 pt-4">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                                <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                                    <Avatar className="h-8 w-8 mt-0.5">
                                        {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                                    </Avatar>
                                    <div
                                        className={`rounded-lg px-3 py-2 text-sm ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                                            }`}
                                    >
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-3 max-w-[80%]">
                                    <Avatar className="h-8 w-8 mt-0.5">
                                        <Bot className="h-4 w-4" />
                                    </Avatar>
                                    <div className="rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        Thinking...
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="pt-0">
                <form onSubmit={handleSendMessage} className="w-full flex gap-2">
                    <Input
                        placeholder="Ask for event recommendations..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-slate-600 hover:bg-slate-700" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}

