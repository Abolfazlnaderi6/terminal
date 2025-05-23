"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight, Check } from "lucide-react"

type CalendarGroup = {
  name: string
  items: string[]
  expanded?: boolean
}

type CalendarsProps = {
  calendars: CalendarGroup[]
}

export function Calendars({ calendars: initialCalendars }: CalendarsProps) {
  const [calendars, setCalendars] = useState(initialCalendars.map((group) => ({ ...group, expanded: true })))
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>(["Personal", "Work", "Holidays"])

  const toggleGroup = (index: number) => {
    setCalendars((prev) => prev.map((group, i) => (i === index ? { ...group, expanded: !group.expanded } : group)))
  }

  const toggleCalendar = (calendar: string) => {
    setSelectedCalendars((prev) => (prev.includes(calendar) ? prev.filter((c) => c !== calendar) : [...prev, calendar]))
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xs uppercase tracking-wider text-green-500">Calendars</h3>
      <div className="space-y-2">
        {calendars.map((group, groupIndex) => (
          <div key={group.name} className="space-y-1">
            <button
              className="flex items-center w-full text-sm hover:text-green-300"
              onClick={() => toggleGroup(groupIndex)}
            >
              {group.expanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
              {group.name}
            </button>

            {group.expanded && (
              <div className="ml-5 space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item}
                    className="flex items-center w-full text-xs hover:text-green-300"
                    onClick={() => toggleCalendar(item)}
                  >
                    <span className="w-4 h-4 mr-1 flex items-center justify-center">
                      {selectedCalendars.includes(item) && <Check className="w-3 h-3" />}
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
