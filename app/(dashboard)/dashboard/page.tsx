import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserSquare2, School, GraduationCap } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Total Students", value: "1,248", icon: Users, description: "+24 from last month" },
    { title: "Total Teachers", value: "84", icon: UserSquare2, description: "Active this semester" },
    { title: "Active Classes", value: "42", icon: School, description: "Across 6 grade levels" },
    { title: "Avg. Attendance", value: "94.2%", icon: GraduationCap, description: "Consistent week-over-week" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">System Overview</h2>
        <p className="text-muted-foreground">Welcome back, Admin. Here is what is happening across your institution today.</p>
      </div>

      {/* Stats Cards Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Placeholders for Complex UI Components */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg m-2">
            [Chart Component Placeholder - to be implemented in Analytics phase]
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity Log</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg m-2">
            [Activity Feed Component Placeholder]
          </CardContent>
        </Card>
      </div>
    </div>
  );
}