"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Terminal as XTerm } from "xterm"
import { FitAddon } from "xterm-addon-fit"
import "xterm/css/xterm.css"

export default function Terminal() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [terminal, setTerminal] = useState<XTerm | null>(null)
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>(["EDEXui Terminal v1.0.0", "Type 'help' for available commands", ""])

  useEffect(() => {
    if (!terminalRef.current) return

    try {
      // Initialize terminal
      const term = new XTerm({
        cursorBlink: true,
        theme: {
          background: "#000000",
          foreground: "#33ff33",
          cursor: "#33ff33",
        },
        fontFamily: "monospace",
        fontSize: 14,
      })

      const fitAddon = new FitAddon()
      term.loadAddon(fitAddon)

      term.open(terminalRef.current)
      fitAddon.fit()

      term.writeln("EDEXui Terminal v1.0.0")
      term.writeln("Type 'help' for available commands")
      term.writeln("")
      term.write("$ ")

      term.onKey(({ key, domEvent }) => {
        const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey

        if (domEvent.keyCode === 13) {
          // Enter
          term.writeln("")
          processCommand(term, input)
          setInput("")
          term.write("$ ")
        } else if (domEvent.keyCode === 8) {
          // Backspace
          if (input.length > 0) {
            term.write("\b \b")
            setInput(input.slice(0, -1))
          }
        } else if (printable) {
          term.write(key)
          setInput(input + key)
        }
      })

      setTerminal(term)

      // Handle window resize
      const handleResize = () => {
        fitAddon.fit()
      }

      window.addEventListener("resize", handleResize)
      return () => {
        window.removeEventListener("resize", handleResize)
        term.dispose()
      }
    } catch (error) {
      console.error("Failed to initialize terminal:", error)
      // Fallback to simulated terminal
      setTerminal(null)
    }
  }, [])

  // Simulated terminal for environments where xterm.js doesn't work
  const handleSimulatedInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newOutput = [...output, `$ ${input}`, processSimulatedCommand(input)]
      setOutput(newOutput)
      setInput("")
    }
  }

  function processCommand(term: XTerm, cmd: string) {
    if (cmd.trim() === "") return

    const command = cmd.trim().toLowerCase()

    if (command === "help") {
      term.writeln("Available commands:")
      term.writeln("  help     - Show this help")
      term.writeln("  clear    - Clear the terminal")
      term.writeln("  date     - Show current date and time")
      term.writeln("  echo     - Echo a message")
      term.writeln("  whoami   - Show current user")
      term.writeln("  ls       - List files")
    } else if (command === "clear") {
      term.clear()
    } else if (command === "date") {
      term.writeln(new Date().toString())
    } else if (command.startsWith("echo ")) {
      term.writeln(command.substring(5))
    } else if (command === "whoami") {
      term.writeln("user@edexui")
    } else if (command === "ls") {
      term.writeln("Documents/")
      term.writeln("Downloads/")
      term.writeln("Pictures/")
      term.writeln("Music/")
      term.writeln("Videos/")
      term.writeln("system.config")
    } else {
      term.writeln(`Command not found: ${command}`)
    }
  }

  function processSimulatedCommand(cmd: string): string {
    if (cmd.trim() === "") return ""

    const command = cmd.trim().toLowerCase()

    if (command === "help") {
      return "Available commands:\n  help     - Show this help\n  clear    - Clear the terminal\n  date     - Show current date and time\n  echo     - Echo a message\n  whoami   - Show current user\n  ls       - List files"
    } else if (command === "clear") {
      setTimeout(() => setOutput(["EDEXui Terminal v1.0.0", "Type 'help' for available commands", ""]), 0)
      return ""
    } else if (command === "date") {
      return new Date().toString()
    } else if (command.startsWith("echo ")) {
      return command.substring(5)
    } else if (command === "whoami") {
      return "user@edexui"
    } else if (command === "ls") {
      return "Documents/\nDownloads/\nPictures/\nMusic/\nVideos/\nsystem.config"
    } else {
      return `Command not found: ${command}`
    }
  }

  // Render either the xterm.js terminal or a simulated one
  return (
    <div className="h-full bg-black text-green-400 p-1">
      {terminal ? (
        <div ref={terminalRef} className="h-full" />
      ) : (
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-auto p-2 font-mono text-sm">
            {output.map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
          <div className="flex items-center p-1">
            <span className="mr-1">$</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleSimulatedInput}
              className="flex-1 bg-transparent border-none outline-none text-green-400 font-mono"
              autoFocus
            />
          </div>
        </div>
      )}
    </div>
  )
}
