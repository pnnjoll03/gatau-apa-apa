import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { Reminder } from "@/types/reminder"

export async function generateRecommendations(userInput: string, todayReminders: Reminder[]): Promise<string> {
    try {
        const formattedReminders = todayReminders
            .map((reminder) => {
                const start = new Date(reminder.date)
                const end = new Date(reminder.endDate)
                return `- ${reminder.title} (${formatTime(start)} - ${formatTime(end)}): ${reminder.description || "No description"}`
            })
            .join("\n")

        const today = new Date()
        const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today.getDay()]
        const formattedDate = `${dayOfWeek}, ${today.toLocaleDateString()}`

        const prompt = `
User query: "${userInput}"

Today is ${formattedDate}.

${todayReminders.length > 0
                ? `Today's scheduled reminders:\n${formattedReminders}`
                : "There are no scheduled reminders for today."
            }

Based on the user's query and their schedule for today, provide helpful recommendations, suggestions, or answer their question. 
If they're asking for event recommendations, suggest activities that would fit into their schedule.
Keep your response conversational, helpful, and concise.
`

        const { text } = await generateText({
            model: openai("gpt-4o"),
            prompt: prompt,
            system:
                "You are a helpful calendar assistant that provides event recommendations and helps users manage their time effectively. Be concise and practical in your suggestions.",
        })

        return text
    } catch (error) {
        console.error("Error generating AI response:", error)
        return "I'm sorry, I couldn't generate recommendations at the moment. Please try again later."
    }
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

