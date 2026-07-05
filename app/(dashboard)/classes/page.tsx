"use client";

import { useState } from "react";
import { ClassSection } from "@/types/class";
import { Badge } from "@/components/ui/badge"; // Fixed: Imported standard shadcn Badge
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Users, MapPin, Plus, Search } from "lucide-react";

const mockSections: ClassSection[] = [
  {
    id: "c1",
    classCode: "BIO-101-A",
    className: "Introductory Biology Foundations",
    teacherName: "Dr. Alan Grant",
    roomNumber: "Lab Room 302",
    scheduleDays: ["MON", "WED", "FRI"],
    timeSlot: "09:00 AM - 10:15 AM",
    enrolledCount: 28,
    maxCapacity: 30,
    status: "OPEN"
  },
  {
    id: "c2",
    classCode: "LIT-204-B",
    className: "Creative Writing Workshop",
    teacherName: "Sarah Jenkins",
    roomNumber: "Humanities Hall 104",
    scheduleDays: ["TUE", "THU"],
    timeSlot: "11:00 AM - 12:30 PM",
    enrolledCount: 25,
    maxCapacity: 25,
    status: "FULL"
  },
  {
    id: "c3",
    classCode: "MATH-401-A",
    className: "Advanced Calculus & Real Analysis",
    teacherName: "Dr. Elizabeth Vance",
    roomNumber: "Science Annex 201",
    scheduleDays: ["MON", "WED"],
    timeSlot: "01:30 PM - 03:00 PM",
    enrolledCount: 14,
    maxCapacity: 20,
    status: "OPEN"
  }
];

export default function ClassesPage() {
  const [searchFilter, setSearchFilter] = useState("");

  const filteredSections = mockSections.filter((sec) =>
    sec.className.toLowerCase().includes(searchFilter.toLowerCase()) ||
    sec.classCode.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Management Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Academic Classes</h2>
          <p className="text-muted-foreground">Orchestrate section allocations, classroom distributions, and roster limits.</p>
        </div>
        <Button className="shrink-0 shadow-sm">
          <Plus className="mr-2 h-4 w-4" /> Schedule New Section
        </Button>
      </div>

      {/* Roster Controls */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <input 
          type="text" 
          placeholder="Filter by section identifier or title..." 
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-shadow"
        />
      </div>

      {/* Dynamic Scheduling Card Layout Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredSections.map((section) => {
          const availabilityPercentage = (section.enrolledCount / section.maxCapacity) * 100;
          
          return (
            <Card key={section.id} className="shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-primary bg-primary/5 px-2 py-0.5 rounded">
                      {section.classCode}
                    </span>
                    <CardTitle className="text-base font-bold mt-2 leading-tight">
                      {section.className}
                    </CardTitle>
                  </div>
                  {/* Fixed: Replaced LocalBadge with standard Badge and mapped standard variants */}
                  <Badge variant={section.status === "FULL" ? "secondary" : "default"}>
                    {section.status}
                  </Badge>
                </div>
                <CardDescription className="text-xs pt-1 flex items-center gap-1">
                  <BookOpen className="h-3 w-3 shrink-0" /> Instructor: {section.teacherName}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4 text-xs">
                {/* Meta details stack */}
                <div className="space-y-2 border-y py-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{section.scheduleDays.join(" • ")} @ {section.timeSlot}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    <span>{section.roomNumber}</span>
                  </div>
                </div>

                {/* Enrollment gauge calculations */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-zinc-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5 text-slate-400" /> Allocation Fill
                    </span>
                    <span>{section.enrolledCount} / {section.maxCapacity} Students</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        availabilityPercentage >= 100 ? "bg-amber-500" : "bg-primary"
                      }`}
                      style={{ width: `${availabilityPercentage}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}