import { ArrowRight, ClipboardList, Database, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const quickActions = [
  {
    title: "Clinics Queue",
    description:
      "Monitor queue activity by clinic and filter queue status from one screen.",
    href: "/clinics-queue",
    icon: Stethoscope,
  },
  {
    title: "Queues",
    description: "Review the broader queue page and extend queue operations later.",
    href: "/queues",
    icon: ClipboardList,
  },
  {
    title: "Master Data",
    description: "Manage clinics, staff, and doctor master data in one place.",
    href: "/master",
    icon: Database,
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Quick access to queue operations and clinic monitoring features.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title}>
            <CardHeader className="space-y-3">
              <action.icon className="h-8 w-8 text-primary" />
              <div className="space-y-1">
                <CardTitle>{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link to={action.href}>
                  Open menu
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
