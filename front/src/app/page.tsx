import { Banker } from "@/components/Banker";
import { ChatBox } from "@/components/ChatBox";
import { ChatBubble } from "@/components/ChatBubble";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto px-4 gap-8">
          <div className="w-full lg:flex-1 flex justify-center">
            <div className="text-center">
              <p>test</p>
            </div>
          </div>

          <div className="w-full lg:flex-1 relative">
            <div className="relative z-10">
              <ChatBubble />
            </div>

            <div className="reception-counter relative mt-8 flex justify-center">
              <img className="relative z-0 max-w-full h-auto" src="/images/counter.png" alt="counter"/>
              <div className="absolute inset-0 flex items-center justify-center">
                <Banker />
              </div>
            </div>

            <div className="mt-8">
              <ChatBox />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
