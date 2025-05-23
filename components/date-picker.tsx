"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function DatePicker() {
  const [date, setDate] = useState(new Date())

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const prevMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() - 1)
      return newDate
    })
  }

  const nextMonth = () => {
    setDate((prev) => {
      const newDate = new Date(prev)
      newDate.setMonth(newDate.getMonth() + 1)
      return newDate
    })
  }

  const year = date.getFullYear()
  const month = date.getMonth()
  const today = new Date()
  const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year
  const currentDate = today.getDate()

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <button onClick={prevMonth} className="p-1 hover:text-green-300">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <h3 className="text-sm font-medium">
          {monthNames[month]} {year}
        </h3>
        <button onClick={nextMonth} className="p-1 hover:text-green-300">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {daysOfWeek.map((day) => (
          <div key={day} className="py-1 text-green-500">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <div
            key={index}
            className={`py-1 rounded-sm ${
              day === null
                ? "text-transparent"
                : isCurrentMonth && day === currentDate
                  ? "bg-green-800 text-black font-bold"
                  : "hover:bg-green-900/30 cursor-pointer"
            }`}
          >
            {day === null ? "0" : day}
          </div>
        ))}
      </div>
    </div>
  )
}
