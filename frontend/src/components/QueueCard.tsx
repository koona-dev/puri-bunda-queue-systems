import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QueueWithDetails, QueueStatus, Priority } from "@/types/queue.types";
import { MoreVertical, User, Building2, Stethoscope, Hash } from "lucide-react";

interface QueueCardProps {
  queue: QueueWithDetails;
  onStatusChange: (queueId: string, status: QueueStatus) => void;
  isDragging?: boolean;
}

const getStatusBadgeVariant = (status: QueueStatus) => {
  switch (status) {
    case QueueStatus.Waiting:
      return "warning";
    case QueueStatus.Called:
      return "info";
    case QueueStatus.Done:
      return "success";
    case QueueStatus.Cancelled:
      return "destructive";
    default:
      return "default";
  }
};

const getPriorityBadgeVariant = (priority: Priority) => {
  switch (priority) {
    case Priority.Emergency:
      return "destructive";
    case Priority.Urgent:
      return "warning";
    case Priority.Normal:
      return "secondary";
    default:
      return "default";
  }
};

export function QueueCard({ queue, onStatusChange, isDragging }: QueueCardProps) {
  return (
    <Card
      className={`transition-shadow hover:shadow-md ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono font-semibold text-lg">
              {queue.queueNumber}
            </span>
            <Badge variant={getPriorityBadgeVariant(queue.priority)}>
              {queue.priority}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onStatusChange(queue.id, QueueStatus.Waiting)}
                disabled={queue.status === QueueStatus.Waiting}
              >
                Set to Waiting
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange(queue.id, QueueStatus.Called)}
                disabled={queue.status === QueueStatus.Called}
              >
                Set to Called
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onStatusChange(queue.id, QueueStatus.Done)}
                disabled={queue.status === QueueStatus.Done}
              >
                Set to Done
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{queue.patient.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{queue.clinic.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Dr. {queue.doctor.name}</span>
        </div>
        {queue.staff.loketNumber && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Loket:</span>
            <Badge variant="outline">{queue.staff.loketNumber}</Badge>
          </div>
        )}
        <div className="pt-2">
          <Badge variant={getStatusBadgeVariant(queue.status)}>
            {queue.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
