"use client"

import { User } from "lucide-react"

type NavUserProps = {
  user: {
    name: string
    email: string
    avatar?: string
  }
}

export function NavUser({ user }: NavUserProps) {
  return (
    <div className="flex items-center gap-2 p-2 w-full">
      <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center overflow-hidden border border-green-800/50">
        {user.avatar ? (
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <User className="w-4 h-4" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{user.name}</div>
        <div className="text-xs text-green-400/70 truncate">{user.email}</div>
      </div>
    </div>
  )
}
