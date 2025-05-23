"use client"
import Terminal from "@/components/terminal"
import Clock from "@/components/clock"
import NetworkStatus from "@/components/network-status"
import WorldView from "@/components/world-view"
import VirtualKeyboard from "@/components/virtual-keyboard"
import FileExplorer from "@/components/file-explorer"

export default function Home() {
  return (
    <div className="bg-black text-green-400 font-mono h-screen w-screen overflow-hidden flex flex-col">
      {/* Top section - 25% from top */}
      <div className="h-[25%] flex">
        {/* Left side - 25% */}
        <div className="w-[25%] p-2 border-r border-green-800/30">
          <Clock />
          <NetworkStatus />
        </div>

        {/* Middle - 50% */}
        <div className="w-[50%]"></div>

        {/* Right side - 25% */}
        <div className="w-[25%] p-2 border-l border-green-800/30">
          <WorldView />
        </div>
      </div>

      {/* Middle section - 50% for terminal */}
      <div className="h-[50%] flex">
        <div className="w-[25%]"></div>
        <div className="w-[50%] border border-green-800/50 rounded-md overflow-hidden">
          <Terminal />
        </div>
        <div className="w-[25%]"></div>
      </div>

      {/* Bottom section - 25% for keyboard and files */}
      <div className="h-[25%] flex">
        <div className="w-1/2 border-t border-r border-green-800/30">
          <VirtualKeyboard />
        </div>
        <div className="w-1/2 border-t border-green-800/30">
          <FileExplorer />
        </div>
      </div>
    </div>
  )
}
