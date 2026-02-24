import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MoreHorizontal, UserPlus } from "lucide-react";
import { useState } from "react";
import AddUser from "./AddUser";

const users = [
  {
    id: "EMP-8821",
    name: "Ahmed Al Mansoori",
    role: "Admin (SFD)",
    dept: "Strategic Planning",
    status: "Active",
    lastActive: "Just now",
  },
  {
    id: "EMP-9932",
    name: "Sarah Johnson",
    role: "Admin (SFD)",
    dept: "Cyber Security",
    status: "Active",
    lastActive: "45 min ago",
  },
  {
    id: "EMP-1244",
    name: "Fatima Ali",
    role: "Game Master",
    dept: "HR Department",
    status: "Inactive",
    lastActive: "2 days ago",
  },
  {
    id: "EMP-5531",
    name: "Khalid Omar",
    role: "Game Coordinator",
    dept: "Traffic Control",
    status: "Active",
    lastActive: "5 hours ago",
  },
  {
    id: "EMP-7722",
    name: "John Smith",
    role: "Future Designer",
    dept: "Forensics",
    status: "Active",
    lastActive: "1 day ago",
  },
  {
    id: "EMP-3311",
    name: "Layla Hassan",
    role: "Game Master",
    dept: "Operations",
    status: "Active",
    lastActive: "3 hours ago",
  },
  {
    id: "EMP-6655",
    name: "Mohammed Rashid",
    role: "Admin (SFD)",
    dept: "Strategic Planning",
    status: "Active",
    lastActive: "1 week ago",
  },
];

export default function UserManagement() {
  const [employeeId, setEmployeeId] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeId(e.target.value);
    // Simulate auto-population after 4 chars
    if (e.target.value.length >= 4) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              User Management
            </h1>
            <p className="text-muted-foreground">
              Manage access, roles, and department permissions
            </p>
          </div>

          <AddUser
            showDetails={showDetails}
            employeeId={employeeId}
            handleIdChange={handleIdChange}
          />
        </div>

        <div className="glass-card rounded-lg p-1">
          <div className="p-4 border-b border-white/5 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by Employee ID, name or department..."
                className="pl-10 bg-background/50 border-white/5 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                variant="secondary"
                className="border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button
                variant="secondary"
                className="border-white/10 hover:bg-white/5 text-muted-foreground hover:text-white"
              >
                Export
              </Button>
            </div>
          </div>

          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-primary font-bold">
                  Employee ID
                </TableHead>
                <TableHead className="text-primary font-bold">
                  Full Name
                </TableHead>
                <TableHead className="text-primary font-bold">Role</TableHead>
                <TableHead className="text-primary font-bold">
                  Department
                </TableHead>
                <TableHead className="text-primary font-bold">Status</TableHead>

                <TableHead className="text-right text-primary font-bold">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-white/5 hover:bg-white/5 transition-colors"
                >
                  <TableCell className="font-mono text-muted-foreground">
                    {user.id}
                  </TableCell>
                  <TableCell className="font-medium text-white">
                    {user.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="border-white/10 bg-white/5 text-white"
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.dept}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={`
                        ${
                          user.status === "Active"
                            ? "border-primary/30 text-primary bg-primary/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]"
                            : "border-muted text-muted-foreground bg-muted/20"
                        }
                      `}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
}
