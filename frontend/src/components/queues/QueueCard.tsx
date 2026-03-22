import { GripVertical, Hash, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { QueueItem, QueueStatus } from "@/types/queue";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";

interface QueueCardProps {
  queue: QueueItem;
  onStatusChange: (id: string, status: QueueStatus) => void;
}

const STATUS_NEXT: Record<QueueStatus, QueueStatus | null> = {
  Waiting: "Called",
  Called: "Done",
  Done: null,
};

const STATUS_LABEL: Record<QueueStatus, string> = {
  Waiting: "Panggil",
  Called: "Selesai",
  Done: "Selesai",
};

const PRIORITY_VARIANT: Record<
  QueueItem["priority"],
  "destructive" | "warning" | "secondary"
> = {
  Emergency: "destructive",
  Urgent: "warning",
  Normal: "secondary",
};

const STATUS_BADGE_VARIANT: Record<
  QueueStatus,
  "info" | "warning" | "success"
> = {
  Waiting: "info",
  Called: "warning",
  Done: "success",
};

export function QueueCard({ queue, onStatusChange }: QueueCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: queue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const nextStatus = STATUS_NEXT[queue.status];

  return (
    <div ref={setNodeRef} style={style}>
      <Card
        className={cn(
          "mb-3 select-none",
          isDragging && "opacity-50 shadow-lg ring-2 ring-primary",
          queue.priority === "Emergency" && "border-red-400",
          queue.priority === "Urgent" && "border-amber-400"
        )}
      >
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {/* Drag handle */}
            <button
              className="mt-0.5 cursor-grab touch-none text-muted-foreground active:cursor-grabbing"
              {...attributes}
              {...listeners}
              aria-label="Drag to reorder"
            >
              <GripVertical className="h-5 w-5" />
            </button>

            {/* Queue info */}
            <div className="min-w-0 flex-1 space-y-2">
              {/* Top row: queue number + badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-base">{queue.queueNumber}</span>
                <Badge variant={PRIORITY_VARIANT[queue.priority]}>
                  {queue.priority}
                </Badge>
                <Badge variant={STATUS_BADGE_VARIANT[queue.status]}>
                  {queue.status}
                </Badge>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-1 gap-1 text-sm text-muted-foreground sm:grid-cols-2">
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{queue.patientName}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5 shrink-0" />
                  <span>Loket {queue.loketNumber}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:col-span-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{queue.clinicName}</span>
                </div>
              </div>
            </div>

            {/* Action button */}
            {nextStatus && (
              <Button
                size="sm"
                variant={queue.status === "Called" ? "default" : "outline"}
                className="shrink-0"
                onClick={() => onStatusChange(queue.id, nextStatus)}
              >
                {STATUS_LABEL[queue.status]}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
