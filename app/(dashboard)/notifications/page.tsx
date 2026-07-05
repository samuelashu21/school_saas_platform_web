"use client";

import { useState } from "react";
import { SystemNotification } from "@/types/notification";
import { NotificationItem } from "@/components/feedback/NotificationItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCheck, Trash2 } from "lucide-react";

const mockNotifications: SystemNotification[] = [
  {
    id: "n1",
    title: "Critical Attendance Drop Warning",
    message: "Student Chloe Miller (STU-2026-003) has fallen below the 80% mandatory structural attendance threshold for the current semester.",
    category: "ATTENDANCE",
    priority: "CRITICAL",
    timestamp: "10 mins ago",
    isRead: false
  },
  {
    id: "n2",
    title: "Gradebook Calculations Verified",
    message: "Midterm grading assessment summaries have been safely calculated and locked for the Grade 12 Advanced Mathematics cohort.",
    category: "ACADEMIC",
    priority: "INFO",
    timestamp: "2 hours ago",
    isRead: false
  },
  {
    id: "n3",
    title: "Institutional Registration Cutoff",
    message: "System registration parameters for the upcoming Winter term will automatically archive at midnight.",
    category: "REGISTRATION",
    priority: "HIGH",
    timestamp: "1 day ago",
    isRead: true
  }
];

export default function NotificationsPage() {
  const [alerts, setAlerts] = useState<SystemNotification[]>(mockNotifications);

  const handleMarkAsRead = (id: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const handleMarkAllRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const unreadCount = alerts.filter(a => !a.isRead).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Control Module Headers */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">System Notifications</h2>
          <p className="text-muted-foreground">Monitor system events, automated risk triggers, and official logs.</p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={handleMarkAllRead} size="sm" variant="outline" className="shrink-0 text-xs">
            <CheckCheck className="mr-2 h-4 w-4" /> Clear Pending Actions
          </Button>
        )}
      </div>

      {/* Primary Message Log Board */}
      <Card className="shadow-sm">
        <CardHeader className="border-b bg-muted/30 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold">
              Live Event Stream ({unreadCount} Actionable Alerts)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {alerts.length > 0 ? (
            <div className="flex flex-col">
              {alerts.map((alert) => (
                <NotificationItem 
                  key={alert.id} 
                  notification={alert} 
                  onMarkAsRead={handleMarkAsRead} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-xs">
              System queues are clear. No pending notification entries found.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}