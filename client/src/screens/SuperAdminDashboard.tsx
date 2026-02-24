import { Layout } from "@/components/Layout";
import { Users, Gamepad2, CheckCircle2, Clock } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DepartmentLeaderboard } from "./fragments/DepartmentLeaderboard";
import { StrategicReportingPanel } from "./fragments/StrategicReportingPanel";



/* ============================
   STATIC ANALYTICS DATA
   ============================ */

// 1️⃣ Future Scenarios – Grouped Bar (5 Departments)
const futureScenarioData = [
  { department: "Policy", completed: 8, inProgress: 4 },
  { department: "Defense", completed: 5, inProgress: 3 },
  { department: "Economy", completed: 10, inProgress: 5 },
  { department: "Health", completed: 4, inProgress: 2 },
  { department: "Climate", completed: 6, inProgress: 4 },
];

// 2️⃣ Future Retreat – Grouped Bar (Retreats across Departments)
const futureRetreatData = [
  {
    retreat: "Climate Resilience Retreat",
    department: "Climate",
    completed: 3,
    inProgress: 1,
  },
  {
    retreat: "National Security Retreat",
    department: "Defense",
    completed: 2,
    inProgress: 1,
  },
  {
    retreat: "Economic Futures Retreat",
    department: "Economy",
    completed: 4,
    inProgress: 2,
  },
  {
    retreat: "Public Health Retreat",
    department: "Health",
    completed: 3,
    inProgress: 1,
  },
  {
    retreat: "Governance Reform Retreat",
    department: "Policy",
    completed: 5,
    inProgress: 2,
  },
];

export default function SuperAdminDashboard() {
  const statsCards = [
    {
      title: "Future Scenarios Hosted",
      value: 10,
      icon: Gamepad2,
      color: "from-dp-green to-dp-teal",
    },
    {
      title: "Future Retreat Hosted",
      value: 7,
      icon: CheckCircle2,
      color: "from-dp-success to-emerald-600",
    },
    {
      title: "Departments Active",
      value: 8,
      icon: Users,
      color: "from-dp-teal to-blue-500",
    },
    {
      title: "Pending Approvals",
      value: 5,
      icon: Clock,
      color: "from-dp-gold to-amber-600",
    },
  ];

  return (
    <Layout>
      <div className="space-y-10">
        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Super Admin Control Center (SFD)
          </h1>
          <p className="text-muted-foreground">
            Strategic foresight system monitoring & governance
          </p>
        </div>

        {/* ================= KPI CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat) => (
            <GlassCard key={stat.title} className="p-6">
              <div className="flex justify-between">
                <div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.title}
                  </div>
                </div>
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center",
                    stat.color,
                  )}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* ================= GROUPED BAR GRAPHS ================= */}
        <div className="grid grid-cols-1 gap-6">
          {/* 1️⃣ Future Scenarios – Grouped by Department */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-1">
              Future Scenarios – Department-wise Progress
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Completed vs in-progress foresight scenarios across departments
            </p>

            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={futureScenarioData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="department"
                  label={{
                    value: "Departments",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Number of Scenarios",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" name="Completed Scenarios" />
                <Bar dataKey="inProgress" name="In-Progress Scenarios" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* 2️⃣ Future Retreat – Grouped by Retreat */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold mb-1">
              Future Retreats – Completion Status by Department
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Retreat-wise execution progress mapped to responsible departments
            </p>

            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={futureRetreatData} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="retreat"
                  label={{
                    value: "Future Retreat Programs",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: "Number of Retreat Games",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip
                  formatter={(value, name, props) => [
                    value,
                    `${name} (${props.payload.department})`,
                  ]}
                />
                <Legend />
                <Bar dataKey="completed" name="Completed Retreat Games" />
                <Bar dataKey="inProgress" name="In-Progress Retreat Games" />
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* ================= TABLES ================= */}
        <DepartmentLeaderboard />
        <StrategicReportingPanel />
      </div>
    </Layout>
  );
}
