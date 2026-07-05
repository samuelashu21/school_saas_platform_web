"use client";

import { SystemNotification } from "@/types/notification";
import { cn } from "@/lib/utils";
import { Bell, AlertOctagon, Info, CheckCircle } from "lucide-react";

interface NotificationItemProps {
  notification: SystemNotification;
  onMarkAsRead: (id: string) => void;
}

export function NotificationItem({ notification, onMarkAsRead }: NotificationItemProps) {
  // Map priorities to consistent colors
  const priorityIcons = {
    CRITICAL: <AlertOctagon className="h-5 w-5 text-destructive shrink-0" />,
    HIGH: <Bell className="h-5 w-5 text-amber-500 shrink-0" />,
    INFO: <Info className="h-5 w-5 text-blue-500 shrink-0" />
  };

  return (
    <div className={cn(
      "p-4 border-b last:border-0 flex gap-4 transition-colors",
      notification.isRead ? "bg-card opacity-75" : "bg-blue-50/20 dark:bg-zinc-900/40"
    )}>
      <div className="mt-0.5">
        {priorityIcons[notification.priority]}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h4 className={cn("text-sm font-semibold", !notification.isRead && "text-slate-900 dark:text-zinc-50")}>
            {notification.title}
          </h4>
          <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
            {notification.timestamp}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-normal">
          {notification.message}
        </p>
        
        <div className="flex items-center gap-2 pt-1.5">
          <span className="inline-flex items-center rounded bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 text-[10px] font-bold tracking-wide uppercase text-slate-600 dark:text-zinc-400">
            {notification.category}
          </span>
          
          {!notification.isRead && (
            <button 
              onClick={() => onMarkAsRead(notification.id)}
              className="text-[10px] text-primary hover:underline font-semibold flex items-center gap-1"
            >
              <CheckCircle className="h-3 w-3" /> Acknowledge Notification
            </button>
          )}
        </div>
      </div>
    </div>
  );
}