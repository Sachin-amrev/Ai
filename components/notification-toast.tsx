"use client"

import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info } from "lucide-react"

interface NotificationToastProps {
  type: "success" | "error" | "info" | "warning" | "market-up" | "market-down"
  title: string
  message: string
  duration?: number
}

export function NotificationToast({ type, title, message, duration = 5000 }: NotificationToastProps) {
  const { toast } = useToast()

  useEffect(() => {
    const getIcon = () => {
      switch (type) {
        case "success":
          return <CheckCircle className="h-4 w-4 text-green-500" />
        case "error":
          return <AlertTriangle className="h-4 w-4 text-red-500" />
        case "warning":
          return <AlertTriangle className="h-4 w-4 text-yellow-500" />
        case "market-up":
          return <TrendingUp className="h-4 w-4 text-green-500" />
        case "market-down":
          return <TrendingDown className="h-4 w-4 text-red-500" />
        default:
          return <Info className="h-4 w-4 text-blue-500" />
      }
    }

    const getVariant = () => {
      switch (type) {
        case "error":
          return "destructive" as const
        default:
          return "default" as const
      }
    }

    toast({
      title: (
        <div className="flex items-center gap-2">
          {getIcon()}
          {title}
        </div>
      ),
      description: message,
      variant: getVariant(),
      duration,
    })
  }, [type, title, message, duration, toast])

  return null
}
