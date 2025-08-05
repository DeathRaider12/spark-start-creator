import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "./ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Badge } from "./ui/badge"

interface Notification {
    id: string
    title: string
    message: string
    type: "info" | "success" | "warning" | "error"
    timestamp: Date
    read: boolean
}

export function NotificationCenter() {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ))
    }

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })))
    }

    const getNotificationColor = (type: Notification["type"]) => {
        switch (type) {
            case "success": return "bg-green-500"
            case "warning": return "bg-yellow-500"
            case "error": return "bg-red-500"
            default: return "bg-blue-500"
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
                            variant="destructive"
                        >
                            {unreadCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications
                    {unreadCount > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs"
                        >
                            Mark all as read
                        </Button>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                        No notifications
                    </div>
                ) : (
                    notifications.map(notification => (
                        <DropdownMenuItem
                            key={notification.id}
                            className="flex items-start gap-2 p-4"
                            onClick={() => markAsRead(notification.id)}
                        >
                            <div
                                className={`h-2 w-2 mt-2 rounded-full shrink-0 ${getNotificationColor(notification.type)
                                    }`}
                            />
                            <div className="space-y-1">
                                <p className="font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.message}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {notification.timestamp.toDateString?.() ??
                                        notification.timestamp.toLocaleString()}
                                </p>
                            </div>
                            {!notification.read && (
                                <div className="ml-auto">
                                    <Badge variant="secondary">New</Badge>
                                </div>
                            )}
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
