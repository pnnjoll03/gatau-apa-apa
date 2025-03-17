import { Calendar } from "@/components/calendar"
import { ChatAssistant } from "@/components/chat-assistant"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-background bg-gradient-to-b from-slate-900 via-[#8C9DA3]  to-[#BDC6C3]">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-bold mb-6 text-customBlue">Calendar</h1>
            <Calendar />
          </div>
          <div className="w-full md:w-1/3 sticky top-4">
            <ChatAssistant />
          </div>
        </div>
      </div>
    </main>
  )
}

